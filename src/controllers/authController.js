import bcrypt from 'bcrypt';
import  connection  from '../database.js';
import { v4 as uuid } from 'uuid';


export async function signUp(req, res) {
  const {name, email, password, confirmPassword} = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  
  try {
    const alreadyexists = await connection.query(`SELECT * FROM users where email = $1`, [email]);
    if(alreadyexists.rows.length > 0){
        return res.sendStatus(409)
    }
    const newuser = await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3); `, [name, email, passwordHash] )
    res.sendStatus(201);
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await connection.query(`SELECT * FROM users where email = $1`, [email]);
  if (user.rows.length > 0 && bcrypt.compareSync(password, user.rows[0].password)) {
    const token = uuid();
    const id = user.rows[0].id

    try {
      const session = await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token])
      res.send({token, name: user.name });
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(401);
  }
}



