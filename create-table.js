const mysql = require('mysql2');
const faker = require('faker');
faker.locale = 'pt_BR'

const connection = mysql.createConnection({
    host: '192.168.99.100',
    port: 3336,
    user: 'root',
    password: 'faesa123',
    database: 'app_development'
})

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Banco de Dados Conectado!')
    createTableInfectados(connection);
    populateInfectados(connection);
})
function createTableInfectados(conn){
    const sql = `CREATE TABLE IF NOT EXISTS Infectados
                    (id INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(200) NOT NULL,
                    uf VARCHAR(200) NOT NULL,
                    cid VARCHAR(200) NOT NULL,
                    end VARCHAR(200) NOT NULL,
                    num VARCHAR(3) NOT NULL,
                    tel VARCHAR(100) NOT NULL,
                    peso INTEGER(3) NOT NULL,
                    alt INTEGER(3) NOT NULL,
                    prob_saude VARCHAR(200) NULL,

                    PRIMARY KEY (id)
                    );`

    conn.query(sql, function(error, reults, fields){
        if(error) return console.log(error);
        console.log('Tabela criada com sucesso!');
    })

}

function populateInfectados(conn){
    const sql = `INSERT INTO Infectados(nome, uf, cid, end, num, tel, peso, alt, prob_saude) VALUES ?`;

    let values = [];

    for(let i = 0; i <10; i++){

        let arrayprob_saude = ["Saudavel","Hipertensão","Asma","Diabetes","Cancer","HIV","Anemia","Saudavel"]
        let prob_saude = arrayprob_saude[Math.floor(Math.random() * arrayprob_saude.length)];
        let peso =  faker.random.number({min:5, max:250});
        
        if(peso <= 30){
            var alt = faker.random.number({min:45, max:150});
        }else{
            var alt = faker.random.number({min:46, max:220});
        }

        values.push([faker.name.findName(), faker.address.stateAbbr(), faker.address.city(),
            faker.address.streetName(), faker.random.number({min:0, max:999}),  faker.phone.phoneNumberFormat(1),
            peso, alt, prob_saude]);

    }

    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Registros inseridos com sucesso!');
        conn.end();
    });
}