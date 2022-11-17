import { ObjectId } from "mongodb";
import clientPromise from "../../util/mongodb";

export default async function formhandler(req, res) {
  const body = req.body;

  const client = await clientPromise;
  const db = client.db("form");
  switch (req.method) {
    case "POST":
      let user = await db.collection("user-data").insertOne(body);
      res.json({ status: "ok" });
      break;
    case "GET":
      const users = await db.collection("user-data").find({}).toArray();
      res.json({ status: 200, data: users });
      break;
    case "PUT":
      const filter = { _id: ObjectId(body.id) };

      const options = { upsert: true };
      const updateDoc = {
        $set: {
          vendor_name: body.vendor_name,
          bank_account_number: body.bank_account_number,
          bank_name: body.bank_name,
          address_line_1: body.address_line_1,
          address_line_2: body.address_line_2,
          city: body.city,
          country: body.country,
          zipcode: body.zipcode,
        },
      };

      const result = await db
        .collection("user-data")
        .updateOne(filter, updateDoc, options);

      res.json({ status: "ok" });
      break;
    case "DELETE":
      const deleteDoc = {
        vendor_name: body.vendor_name,
        bank_account_number: body.bank_account_number,
        bank_name: body.bank_name,
      };
      console.log(deleteDoc);
      const response = await db.collection("user-data").deleteOne(deleteDoc);
      res.json({ status: "ok" });
      break;
  }
}
