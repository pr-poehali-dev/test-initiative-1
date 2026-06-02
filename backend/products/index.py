import json
import os
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """API для управления товарами: GET список, POST создание, PUT редактирование, DELETE удаление."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    body = json.loads(event["body"]) if event.get("body") else {}

    conn = get_conn()
    cur = conn.cursor()

    try:
        # GET — список всех товаров
        if method == "GET":
            cur.execute("""
                SELECT id, name, price, old_price, category, rating, reviews_count,
                       badge, color, emoji, is_active, created_at
                FROM products ORDER BY created_at DESC
            """)
            rows = cur.fetchall()
            products = [
                {
                    "id": r[0], "name": r[1], "price": r[2], "old_price": r[3],
                    "category": r[4], "rating": float(r[5]), "reviews_count": r[6],
                    "badge": r[7], "color": r[8], "emoji": r[9],
                    "is_active": r[10], "created_at": str(r[11])
                }
                for r in rows
            ]
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"products": products})}

        # POST — создать товар
        if method == "POST":
            cur.execute("""
                INSERT INTO products (name, price, old_price, category, rating, reviews_count, badge, color, emoji, is_active)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body["name"], body["price"], body.get("old_price"),
                body.get("category", "Другое"), body.get("rating", 5.0),
                body.get("reviews_count", 0), body.get("badge"),
                body.get("color", "#FF2D9B"), body.get("emoji", "🛍️"),
                body.get("is_active", True)
            ))
            new_id = cur.fetchone()[0]
            conn.commit()
            return {"statusCode": 201, "headers": cors, "body": json.dumps({"id": new_id, "ok": True})}

        # PUT — обновить товар
        if method == "PUT":
            pid = body.get("id")
            cur.execute("""
                UPDATE products SET
                    name=%s, price=%s, old_price=%s, category=%s,
                    rating=%s, reviews_count=%s, badge=%s, color=%s, emoji=%s, is_active=%s
                WHERE id=%s
            """, (
                body["name"], body["price"], body.get("old_price"),
                body.get("category", "Другое"), body.get("rating", 5.0),
                body.get("reviews_count", 0), body.get("badge"),
                body.get("color", "#FF2D9B"), body.get("emoji", "🛍️"),
                body.get("is_active", True), pid
            ))
            conn.commit()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        # DELETE — удалить товар
        if method == "DELETE":
            pid = params.get("id") or body.get("id")
            cur.execute("DELETE FROM products WHERE id=%s", (pid,))
            conn.commit()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    finally:
        cur.close()
        conn.close()

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
