/* 
    BCrypt
    bcrypt is hashing algorithm. This means you cannot easily retrieve the plaintext password without already knowing the salt, rounds, and key (password).
    A hash function only works one-way, which means that once a value is hashed it can’t be unhashed. This is different from encryption, because, if you know which algorithm was used to encrypt a value, you can use that same algorithm to decrypt it.
    On a typical website, when a user first signs up, we retrieve their password and run it through a hashing algorithm. The hashed password is then stored in the database. 
    Whenever the same user logs in, we hash the password they tried to log in with and compare it to the already stored hash value. If the values match, the user is authenticated.

    The built-in genSalt() function automatically generates a salt for us. Since we’re using an asynchronous function we can await this function call: const salt = await bcrypt.genSalt(saltRounds);

    Once we have a salt generated, we make a call to bcrypt.hash(). bcrypt.hash() takes in a password string and a salt. We await and return this function call since it will return the hashed password.
    Now, our try block looks like:
    try {
        // Generate salt:
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash password using generated salt:
        return await bcrypt.hash(password, salt);
    }
*/


// We also want to handle potential errors. In the catch block, we can print out the error with console.log(). 
// Lastly, we return null if there’s an error with bcrypt and we’re unable to hash a password. The final code might look like:
const passwordHash = async (password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        console.log(err);
    }
    return null;
};



/*
    The process of comparing passwords should look as follows:
        1. Retrieve plain text password.
        2. Hash the password.
        3. Compare the hashed password with the one stored in our DB. (Since we’re using the same hash, it should return the same value if the password is correct.)
    
    bcrypt provides us with a handy function called compare() which takes in a plaintext password (password) and a hashed password (hash): bcrypt.compare(password, hash);
    bcrypt.compare() deduces the salt from the provided hash and is able to then hash the provided password correctly for comparison.
*/

const comparePasswords = async (password, hash) => {
    try {
        const matchFound = await bcrypt.compare(password, hash);
        return matchFound;  // return value will be true if the password provided, when hashed, matches the stored hash
    } catch (err) {
        console.log(err);
    }

    return false;           // return false in order to end the execution of the code if there were any other errors or if bcrypt did not execute correctly.
};