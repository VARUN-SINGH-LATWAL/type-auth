import ADODB from "node-adodb";

const connection = ADODB.open(
  "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:/DataBase/Tablas.mdb"
);

export async function connectDB() {
  try {
    const data = await connection.query("SELECT TOP 1 * FROM users");

    console.log("✅ Database Connected");
    // console.log(data);
  } catch (error) {
    console.error("❌ Connection Failed");
    console.error(error);
  }
}

export default connection;