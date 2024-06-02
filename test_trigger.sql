-- CREATE TRIGGER update_order_total_price
-- AFTER INSERT ON orderdetail
-- FOR EACH ROW
-- BEGIN
--     DECLARE order_total DECIMAL(10, 2);

--     SELECT SUM(od.quantity * p.current_unit_price) INTO order_total
--     FROM orderdetail od
--     JOIN product_detail pd ON od.product_detail_id = pd.id
--     JOIN product p ON pd.product_id = p.id
--     WHERE orderdetail.order_id = NEW.order_id;

--     UPDATE `order`
--     SET total_price = order_total
--     WHERE id = NEW.order_id;
-- END;



-- CREATE TRIGGER update_product_quantity
-- AFTER INSERT ON orderdetail
-- FOR EACH ROW
-- BEGIN
--     -- Update quantity in ProductDetail
--     UPDATE productdetail
--     SET quantity = quantity - NEW.quantity
--     WHERE id = NEW.product_detail_id;

--     -- Update quantity in Product table
--     UPDATE product
--     SET quantity = quantity - NEW.quantity
--     WHERE id = (SELECT product_id FROM productdetail WHERE id = NEW.product_detail_id);
-- END;
