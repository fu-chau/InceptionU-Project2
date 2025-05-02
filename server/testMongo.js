// testMongo.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://robiedu:jlMfs48JNaoLQKAD@yyc.mezzi5y.mongodb.net/yyc_timelaps?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ SUCCESS: Connected to MongoDB');
    const dbs = await client.db().admin().listDatabases();
    console.log('📦 Databases:', dbs.databases.map(db => db.name));
  } catch (err) {
    console.error('❌ FAILED:', err.message);
  } finally {
    await client.close();
  }
}

testConnection();