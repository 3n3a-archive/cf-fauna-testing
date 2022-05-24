import { Router } from 'itty-router'
import faunadb from 'faunadb'
import { getFaunaError } from './util'

const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
  domain: 'db.eu.fauna.com'
});

const {
  Create,
  Collection,
  Match,
  Index,
  Get,
  Ref,
  Paginate,
  Sum,
  Delete,
  Add,
  Select,
  Let,
  Var,
  Update,
  Documents
} = faunadb.query;

const router = Router()

router.get("/", () => {
  return new Response(`Mongo-cf test`)
})

router.get("/quote/random", async () => {
    let res = ""
    try {
         let quotes = await faunaClient.query(
        Get(Documents(Collection("test")))
        )
        res = quotes
    
    }
    catch (e) {
        res = getFaunaError(e)
    }
    return new Response(JSON.stringify(res), {
        status: res.statusCode,
        headers: {
            "Content-Type": "application/json"
        }
    })
})

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
