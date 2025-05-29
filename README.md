# backendAPICripto

1.- crear una base de datos en postgresql con el nnombre: 

cripto_platform


2. - CREAR TABLAS DE DATOS


-- Table: public.CryptoCurrencies

-- DROP TABLE IF EXISTS public."CryptoCurrencies";

CREATE TABLE IF NOT EXISTS public."CryptoCurrencies"
(
    id SERIAL NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    symbol character varying(10) COLLATE pg_catalog."default",
    "currentPrice" numeric(20,8),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "CryptoCurrencies_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CryptoCurrencies"
    OWNER to postgres;
	


-- Table: public.Currencies

-- DROP TABLE IF EXISTS public."Currencies";

CREATE TABLE IF NOT EXISTS public."Currencies"
(
    id SERIAL NOT NULL,
    code character varying(3) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    symbol character varying(5) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Currencies_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Currencies"
    OWNER to postgres;
	
	

-- Table: public.CurrencyCrypto

-- DROP TABLE IF EXISTS public."CurrencyCrypto";

CREATE TABLE IF NOT EXISTS public."CurrencyCrypto"
(
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "CurrencyId" integer NOT NULL,
    "CryptoCurrencyId" integer NOT NULL,
    CONSTRAINT "CurrencyCrypto_pkey" PRIMARY KEY ("CurrencyId", "CryptoCurrencyId"),
    CONSTRAINT "CurrencyCrypto_CryptoCurrencyId_fkey" FOREIGN KEY ("CryptoCurrencyId")
        REFERENCES public."CryptoCurrencies" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "CurrencyCrypto_CurrencyId_fkey" FOREIGN KEY ("CurrencyId")
        REFERENCES public."Currencies" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE, 
	CONSTRAINT "CurrencyCrypto_CurrencyId_fkey2" FOREIGN KEY ("CryptoCurrencyId")
        REFERENCES public."CryptoCurrencies" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CurrencyCrypto"
    OWNER to postgres;
	


	


-- Table: public.HistoricalCryptos

-- DROP TABLE IF EXISTS public."HistoricalCryptos";

CREATE TABLE IF NOT EXISTS public."HistoricalCryptos"
(
    id SERIAL NOT NULL ,
    name character varying(255) COLLATE pg_catalog."default",
    symbol character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "currentPrice" numeric(20,8),
    "validFrom" timestamp with time zone,
    "validTo" timestamp with time zone,
    CONSTRAINT "HistoricalCryptos_pkey" PRIMARY KEY (id),
    CONSTRAINT "HistoricalCryptos_symbol_key" UNIQUE (symbol)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."HistoricalCryptos"
    OWNER to postgres;




-- Table: public.HistoricalCurrencies

-- DROP TABLE IF EXISTS public."HistoricalCurrencies";

CREATE TABLE IF NOT EXISTS public."HistoricalCurrencies"
(
    id SERIAL NOT NULL,
    code character varying(3) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    symbol character varying(5) COLLATE pg_catalog."default",
    "validFrom" timestamp with time zone,
    "validTo" timestamp with time zone,
    CONSTRAINT "HistoricalCurrencies_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."HistoricalCurrencies"
    OWNER to postgres;
	
	


-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    id SERIAL NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;





3.- renombrar el archivo .env.sample a .env


4.- npm install


5. npm run dev


Probar Servicio

Probar los endpoints con Postman o cURL:

Registrar usuario:

bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
Iniciar sesión:

bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
Crear moneda (usar token JWT obtenido):

bash
curl -X POST http://localhost:3000/moneda \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"code": "USD", "name": "Dólar Estadounidense", "symbol": "$"}'
Crear criptomoneda:

bash
curl -X POST http://localhost:3000/criptomoneda \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name": "Bitcoin", "symbol": "BTC", "currentPrice": 50000.00, "currencyIds": [1]}'
Listar criptomonedas por moneda:

bash
curl -X GET "http://localhost:3000/criptomoneda?moneda=USD" \
  -H "Authorization: Bearer <TOKEN>"

