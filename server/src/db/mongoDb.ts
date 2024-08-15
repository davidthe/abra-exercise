import { Place } from "../types/place";
import { DB } from "./db";

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "your uri"


const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


export class mongoDb extends DB {
    private places: any = undefined;
    constructor() {
        super('mongo');
        this.connect();
    }

    async connect() {
        await client.connect();

        const database = client.db("Places-DB");
        this.places = database.collection("Places");
    }

    async insert(place: Place): Promise<any> {
        const result = await this.places?.insertOne(place);
        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
    }

    remove(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    get(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getAll() {
        const result = await this.places?.find();

        const rVal = await result?.toArray();

        return rVal;
    }
}