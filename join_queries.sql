
SELECT * FROM SHIPMENT;
SELECT * FROM TRACKINGUPDATE;
SELECT 
    c.Customer_id,
    c.FirstName,
    c.LastName,
    s.Shipment_id,
    s.Status,
    s.Weight
FROM CUSTOMER c
JOIN SHIPMENT s
ON c.Customer_id = s.Customer_id;


SELECT 
    s.Shipment_id,
    s.Status,
    t.Location,
    t.Timestamp
FROM SHIPMENT s
JOIN TRACKINGUPDATE t
ON s.Shipment_id = t.Shipment_id;


SELECT 
    c.FirstName,
    c.LastName,
    s.Shipment_id,
    s.Status,
    t.Location
FROM CUSTOMER c
JOIN SHIPMENT s
ON c.Customer_id = s.Customer_id
JOIN TRACKINGUPDATE t
ON s.Shipment_id = t.Shipment_id;
