import {pool} from '../db.js';

export const getPing = async(req, res)=> {
    const resSql = await pool.query( 'SELECT "PONG" AS RESULT;')
    res.send(resSql)
}