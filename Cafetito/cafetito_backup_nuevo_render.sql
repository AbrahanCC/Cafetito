--
-- PostgreSQL database dump
--


-- Dumped from database version 17.9 (Debian 17.9-1.pgdg13+1)
-- Dumped by pg_dump version 17.9 (Debian 17.9-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY beneficio.parcialidad_beneficio DROP CONSTRAINT IF EXISTS fkoubx5j3if1am3n9fyuchj6p0n;
ALTER TABLE IF EXISTS ONLY beneficio.transito DROP CONSTRAINT IF EXISTS fkavndbfi6ws9k42a2utrvm3s47;
ALTER TABLE IF EXISTS ONLY beneficio.historial_cuenta DROP CONSTRAINT IF EXISTS fk_historial_cuenta;
ALTER TABLE IF EXISTS ONLY beneficio.detalle_catalogo DROP CONSTRAINT IF EXISTS fk507xgyl99yye0pot0ngef1hrs;
ALTER TABLE IF EXISTS ONLY beneficio.transito DROP CONSTRAINT IF EXISTS fk4621tfju8pltubtotq3k3x9kg;
ALTER TABLE IF EXISTS ONLY agricultor.transportes DROP CONSTRAINT IF EXISTS fkoef25uwe1f58a201yg091oo8r;
ALTER TABLE IF EXISTS ONLY agricultor.transportes DROP CONSTRAINT IF EXISTS fklogvob5j1r2s1m6msit31ldqs;
ALTER TABLE IF EXISTS ONLY agricultor.pesaje DROP CONSTRAINT IF EXISTS fkj2lheaycapewtx2kywgcs190e;
ALTER TABLE IF EXISTS ONLY agricultor.transportes DROP CONSTRAINT IF EXISTS fkhl45vyknri2j9s7on0j81uovn;
ALTER TABLE IF EXISTS ONLY agricultor.transportes DROP CONSTRAINT IF EXISTS fkgihggji7q5da93tv0sa1sko30;
ALTER TABLE IF EXISTS ONLY agricultor.transportista DROP CONSTRAINT IF EXISTS fkbpndoevcxv86lbvl6yxeq3x52;
ALTER TABLE IF EXISTS ONLY agricultor.pesaje DROP CONSTRAINT IF EXISTS fkbc8x4s1irj3wr8ftb7fc6pqh8;
ALTER TABLE IF EXISTS ONLY agricultor.parcialidad DROP CONSTRAINT IF EXISTS fk_parcialidad_pesaje;
ALTER TABLE IF EXISTS ONLY agricultor.pesaje DROP CONSTRAINT IF EXISTS fk9tsekcm8ouqwng4dmo7yds2pm;
ALTER TABLE IF EXISTS ONLY agricultor.detalle_catalogo DROP CONSTRAINT IF EXISTS fk507xgyl99yye0pot0ngef1hrs;
ALTER TABLE IF EXISTS ONLY agricultor.transportista DROP CONSTRAINT IF EXISTS fk4ygsd5dkvbab57nkkgs5yryx;
ALTER TABLE IF EXISTS ONLY agricultor.transportes DROP CONSTRAINT IF EXISTS fk3bphjqf2vcigi1jp5oe4jk05l;
ALTER TABLE IF EXISTS ONLY agricultor.parcialidad DROP CONSTRAINT IF EXISTS fk1mkco4uugw07jd3q703uofcg0;
ALTER TABLE IF EXISTS ONLY pesocabal.usuario DROP CONSTRAINT IF EXISTS usuario_pkey;
ALTER TABLE IF EXISTS ONLY pesocabal.usuario DROP CONSTRAINT IF EXISTS usuario_nombre_key;
ALTER TABLE IF EXISTS ONLY pesocabal.catalogo DROP CONSTRAINT IF EXISTS catalogo_pkey;
ALTER TABLE IF EXISTS ONLY beneficio.transito DROP CONSTRAINT IF EXISTS transito_pkey;
ALTER TABLE IF EXISTS ONLY beneficio.parcialidad_beneficio DROP CONSTRAINT IF EXISTS parcialidad_beneficio_pkey;
ALTER TABLE IF EXISTS ONLY beneficio.historial_cuenta DROP CONSTRAINT IF EXISTS historial_cuenta_pkey;
ALTER TABLE IF EXISTS ONLY beneficio.detalle_catalogo DROP CONSTRAINT IF EXISTS detalle_catalogo_pkey;
ALTER TABLE IF EXISTS ONLY beneficio.cuenta DROP CONSTRAINT IF EXISTS cuenta_pkey;
ALTER TABLE IF EXISTS ONLY beneficio.catalogo DROP CONSTRAINT IF EXISTS catalogo_pkey;
ALTER TABLE IF EXISTS ONLY beneficio.bitacora DROP CONSTRAINT IF EXISTS bitacora_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.agricultor DROP CONSTRAINT IF EXISTS uk_sc4vdwhh3iibnt1biw9td2an0;
ALTER TABLE IF EXISTS ONLY agricultor.transportista DROP CONSTRAINT IF EXISTS uk_hlajj2pa83jm3tc0udvtexuwr;
ALTER TABLE IF EXISTS ONLY agricultor.transportes DROP CONSTRAINT IF EXISTS uk_ed29fep4g4rvsmyv41sco2vir;
ALTER TABLE IF EXISTS ONLY agricultor.transportista DROP CONSTRAINT IF EXISTS transportista_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.transportes DROP CONSTRAINT IF EXISTS transportes_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.pesaje DROP CONSTRAINT IF EXISTS pesaje_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.parcialidad DROP CONSTRAINT IF EXISTS parcialidad_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.modelo DROP CONSTRAINT IF EXISTS modelo_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.marca DROP CONSTRAINT IF EXISTS marca_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.linea DROP CONSTRAINT IF EXISTS linea_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.licencia DROP CONSTRAINT IF EXISTS licencia_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.detalle_catalogo DROP CONSTRAINT IF EXISTS detalle_catalogo_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.color DROP CONSTRAINT IF EXISTS color_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.catalogo DROP CONSTRAINT IF EXISTS catalogo_pkey;
ALTER TABLE IF EXISTS ONLY agricultor.agricultor DROP CONSTRAINT IF EXISTS agricultor_pkey;
ALTER TABLE IF EXISTS pesocabal.usuario ALTER COLUMN id_usuario DROP DEFAULT;
ALTER TABLE IF EXISTS pesocabal.catalogo ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS beneficio.transito ALTER COLUMN id_transito DROP DEFAULT;
ALTER TABLE IF EXISTS beneficio.parcialidad_beneficio ALTER COLUMN id_parcialidad_beneficio DROP DEFAULT;
ALTER TABLE IF EXISTS beneficio.historial_cuenta ALTER COLUMN id_historial DROP DEFAULT;
ALTER TABLE IF EXISTS beneficio.detalle_catalogo ALTER COLUMN id_detalle_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS beneficio.cuenta ALTER COLUMN id_cuenta DROP DEFAULT;
ALTER TABLE IF EXISTS beneficio.catalogo ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS beneficio.bitacora ALTER COLUMN id_bitacora DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.transportista ALTER COLUMN id_transportista DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.transportes ALTER COLUMN id_transporte DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.pesaje ALTER COLUMN id_pesaje DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.parcialidad ALTER COLUMN id_parcialidad DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.modelo ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.marca ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.linea ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.licencia ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.detalle_catalogo ALTER COLUMN id_detalle_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.color ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.catalogo ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE IF EXISTS agricultor.agricultor ALTER COLUMN id_agricultor DROP DEFAULT;
DROP SEQUENCE IF EXISTS pesocabal.usuario_id_usuario_seq;
DROP TABLE IF EXISTS pesocabal.usuario;
DROP SEQUENCE IF EXISTS pesocabal.catalogo_id_catalogo_seq;
DROP TABLE IF EXISTS pesocabal.catalogo;
DROP SEQUENCE IF EXISTS beneficio.transito_id_transito_seq;
DROP TABLE IF EXISTS beneficio.transito;
DROP SEQUENCE IF EXISTS beneficio.parcialidad_beneficio_id_parcialidad_beneficio_seq;
DROP TABLE IF EXISTS beneficio.parcialidad_beneficio;
DROP SEQUENCE IF EXISTS beneficio.historial_cuenta_id_historial_seq;
DROP TABLE IF EXISTS beneficio.historial_cuenta;
DROP SEQUENCE IF EXISTS beneficio.detalle_catalogo_id_detalle_catalogo_seq;
DROP TABLE IF EXISTS beneficio.detalle_catalogo;
DROP SEQUENCE IF EXISTS beneficio.cuenta_id_cuenta_seq;
DROP TABLE IF EXISTS beneficio.cuenta;
DROP SEQUENCE IF EXISTS beneficio.catalogo_id_catalogo_seq;
DROP TABLE IF EXISTS beneficio.catalogo;
DROP SEQUENCE IF EXISTS beneficio.bitacora_id_bitacora_seq;
DROP TABLE IF EXISTS beneficio.bitacora;
DROP SEQUENCE IF EXISTS agricultor.transportista_id_transportista_seq;
DROP TABLE IF EXISTS agricultor.transportista;
DROP SEQUENCE IF EXISTS agricultor.transportes_id_transporte_seq;
DROP TABLE IF EXISTS agricultor.transportes;
DROP SEQUENCE IF EXISTS agricultor.pesaje_id_pesaje_seq;
DROP TABLE IF EXISTS agricultor.pesaje;
DROP SEQUENCE IF EXISTS agricultor.parcialidad_id_parcialidad_seq;
DROP TABLE IF EXISTS agricultor.parcialidad;
DROP SEQUENCE IF EXISTS agricultor.modelo_id_catalogo_seq;
DROP TABLE IF EXISTS agricultor.modelo;
DROP SEQUENCE IF EXISTS agricultor.marca_id_catalogo_seq;
DROP TABLE IF EXISTS agricultor.marca;
DROP SEQUENCE IF EXISTS agricultor.linea_id_catalogo_seq;
DROP TABLE IF EXISTS agricultor.linea;
DROP SEQUENCE IF EXISTS agricultor.licencia_id_catalogo_seq;
DROP TABLE IF EXISTS agricultor.licencia;
DROP SEQUENCE IF EXISTS agricultor.detalle_catalogo_id_detalle_catalogo_seq;
DROP TABLE IF EXISTS agricultor.detalle_catalogo;
DROP SEQUENCE IF EXISTS agricultor.color_id_catalogo_seq;
DROP TABLE IF EXISTS agricultor.color;
DROP SEQUENCE IF EXISTS agricultor.catalogo_id_catalogo_seq;
DROP TABLE IF EXISTS agricultor.catalogo;
DROP SEQUENCE IF EXISTS agricultor.agricultor_id_agricultor_seq;
DROP TABLE IF EXISTS agricultor.agricultor;
DROP SCHEMA IF EXISTS pesocabal;
DROP SCHEMA IF EXISTS beneficio;
DROP SCHEMA IF EXISTS agricultor;
--
-- Name: agricultor; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA agricultor;


--
-- Name: beneficio; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA beneficio;


--
-- Name: pesocabal; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA pesocabal;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agricultor; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.agricultor (
    id_agricultor bigint NOT NULL,
    direccion character varying(255),
    fecha_creacion timestamp(6) without time zone,
    nit character varying(255) NOT NULL,
    nombre character varying(255) NOT NULL,
    telefono character varying(255)
);


--
-- Name: agricultor_id_agricultor_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.agricultor_id_agricultor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: agricultor_id_agricultor_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.agricultor_id_agricultor_seq OWNED BY agricultor.agricultor.id_agricultor;


--
-- Name: catalogo; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.catalogo (
    id_catalogo bigint NOT NULL,
    descripcion character varying(255),
    nombre_catalogo character varying(255) NOT NULL
);


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.catalogo_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.catalogo_id_catalogo_seq OWNED BY agricultor.catalogo.id_catalogo;


--
-- Name: color; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.color (
    id_catalogo bigint NOT NULL,
    id_catalogo_publico integer,
    nombre character varying(255)
);


--
-- Name: color_id_catalogo_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.color_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: color_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.color_id_catalogo_seq OWNED BY agricultor.color.id_catalogo;


--
-- Name: detalle_catalogo; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.detalle_catalogo (
    id_detalle_catalogo bigint NOT NULL,
    codigo character varying(255),
    factor_conversion double precision,
    orden integer,
    valor character varying(255),
    id_catalogo bigint NOT NULL
);


--
-- Name: detalle_catalogo_id_detalle_catalogo_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.detalle_catalogo_id_detalle_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: detalle_catalogo_id_detalle_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.detalle_catalogo_id_detalle_catalogo_seq OWNED BY agricultor.detalle_catalogo.id_detalle_catalogo;


--
-- Name: licencia; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.licencia (
    id_catalogo bigint NOT NULL,
    id_catalogo_publico integer,
    nombre character varying(255)
);


--
-- Name: licencia_id_catalogo_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.licencia_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: licencia_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.licencia_id_catalogo_seq OWNED BY agricultor.licencia.id_catalogo;


--
-- Name: linea; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.linea (
    id_catalogo bigint NOT NULL,
    id_catalogo_publico integer,
    nombre character varying(255)
);


--
-- Name: linea_id_catalogo_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.linea_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: linea_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.linea_id_catalogo_seq OWNED BY agricultor.linea.id_catalogo;


--
-- Name: marca; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.marca (
    id_catalogo bigint NOT NULL,
    id_catalogo_publico integer,
    nombre character varying(255)
);


--
-- Name: marca_id_catalogo_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.marca_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: marca_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.marca_id_catalogo_seq OWNED BY agricultor.marca.id_catalogo;


--
-- Name: modelo; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.modelo (
    id_catalogo bigint NOT NULL,
    id_catalogo_publico integer,
    nombre character varying(255)
);


--
-- Name: modelo_id_catalogo_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.modelo_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: modelo_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.modelo_id_catalogo_seq OWNED BY agricultor.modelo.id_catalogo;


--
-- Name: parcialidad; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.parcialidad (
    id_parcialidad bigint NOT NULL,
    diferencia_peso double precision,
    fecha_recepcion date,
    hora_recepcion time(6) without time zone,
    id_transportista bigint,
    observaciones character varying(255),
    peso_actual double precision,
    placa character varying(255),
    estado bigint,
    id_pesaje bigint NOT NULL,
    id_cuenta bigint NOT NULL
);


--
-- Name: parcialidad_id_parcialidad_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.parcialidad_id_parcialidad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: parcialidad_id_parcialidad_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.parcialidad_id_parcialidad_seq OWNED BY agricultor.parcialidad.id_parcialidad;


--
-- Name: pesaje; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.pesaje (
    id_pesaje bigint NOT NULL,
    cantidad_parcialidades integer,
    fecha timestamp(6) without time zone,
    no_cuenta character varying(255),
    observaciones character varying(255),
    peso_total_actual double precision,
    id_agricultor bigint NOT NULL,
    estado bigint,
    medida bigint,
    id_cuenta bigint NOT NULL
);


--
-- Name: pesaje_id_pesaje_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.pesaje_id_pesaje_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pesaje_id_pesaje_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.pesaje_id_pesaje_seq OWNED BY agricultor.pesaje.id_pesaje;


--
-- Name: transportes; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.transportes (
    id_transporte bigint NOT NULL,
    disponible boolean,
    estado integer,
    observaciones character varying(255),
    pesaje_asociado bigint,
    placa character varying(255) NOT NULL,
    id_agricultor bigint NOT NULL,
    id_color bigint,
    id_linea bigint,
    id_marca bigint,
    id_modelo bigint
);


--
-- Name: transportes_id_transporte_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.transportes_id_transporte_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transportes_id_transporte_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.transportes_id_transporte_seq OWNED BY agricultor.transportes.id_transporte;


--
-- Name: transportista; Type: TABLE; Schema: agricultor; Owner: -
--

CREATE TABLE agricultor.transportista (
    id_transportista bigint NOT NULL,
    cui character varying(255) NOT NULL,
    disponible boolean,
    estado integer,
    fecha_nacimiento date,
    fecha_venci_licencia date,
    nombre character varying(255) NOT NULL,
    pesaje_asociado bigint,
    id_agricultor bigint NOT NULL,
    tipo_licencia bigint
);


--
-- Name: transportista_id_transportista_seq; Type: SEQUENCE; Schema: agricultor; Owner: -
--

CREATE SEQUENCE agricultor.transportista_id_transportista_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transportista_id_transportista_seq; Type: SEQUENCE OWNED BY; Schema: agricultor; Owner: -
--

ALTER SEQUENCE agricultor.transportista_id_transportista_seq OWNED BY agricultor.transportista.id_transportista;


--
-- Name: bitacora; Type: TABLE; Schema: beneficio; Owner: -
--

CREATE TABLE beneficio.bitacora (
    id_bitacora bigint NOT NULL,
    operacion character varying(100),
    usuario character varying(100),
    cuenta bigint,
    observacion text,
    fecha_sistema timestamp without time zone,
    balance double precision,
    codigo_peso character varying(100),
    estado character varying(50),
    extemporaneo boolean,
    medida character varying(100),
    parcial bigint,
    peso_observado double precision,
    peso_real double precision,
    transporte character varying(100),
    transportista character varying(100)
);


--
-- Name: bitacora_id_bitacora_seq; Type: SEQUENCE; Schema: beneficio; Owner: -
--

CREATE SEQUENCE beneficio.bitacora_id_bitacora_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bitacora_id_bitacora_seq; Type: SEQUENCE OWNED BY; Schema: beneficio; Owner: -
--

ALTER SEQUENCE beneficio.bitacora_id_bitacora_seq OWNED BY beneficio.bitacora.id_bitacora;


--
-- Name: catalogo; Type: TABLE; Schema: beneficio; Owner: -
--

CREATE TABLE beneficio.catalogo (
    id_catalogo bigint NOT NULL,
    descripcion character varying(255),
    nombre_catalogo character varying(100) NOT NULL
);


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE; Schema: beneficio; Owner: -
--

CREATE SEQUENCE beneficio.catalogo_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: beneficio; Owner: -
--

ALTER SEQUENCE beneficio.catalogo_id_catalogo_seq OWNED BY beneficio.catalogo.id_catalogo;


--
-- Name: cuenta; Type: TABLE; Schema: beneficio; Owner: -
--

CREATE TABLE beneficio.cuenta (
    id_cuenta bigint NOT NULL,
    id_agricultor bigint NOT NULL,
    peso_total double precision,
    cantidad_parcialidades integer,
    fecha_envio timestamp without time zone,
    estado character varying(50),
    fecha_llegada timestamp without time zone,
    diferencia_total double precision,
    resultado_tolerancia character varying(255),
    tolerancia double precision,
    peso_acumulado double precision,
    peso_objetivo double precision,
    saldo_pendiente double precision,
    peso_bascula_total double precision
);


--
-- Name: cuenta_id_cuenta_seq; Type: SEQUENCE; Schema: beneficio; Owner: -
--

CREATE SEQUENCE beneficio.cuenta_id_cuenta_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cuenta_id_cuenta_seq; Type: SEQUENCE OWNED BY; Schema: beneficio; Owner: -
--

ALTER SEQUENCE beneficio.cuenta_id_cuenta_seq OWNED BY beneficio.cuenta.id_cuenta;


--
-- Name: detalle_catalogo; Type: TABLE; Schema: beneficio; Owner: -
--

CREATE TABLE beneficio.detalle_catalogo (
    id_detalle_catalogo bigint NOT NULL,
    codigo character varying(50),
    factor_conversion double precision,
    orden integer,
    valor character varying(100),
    id_catalogo bigint NOT NULL
);


--
-- Name: detalle_catalogo_id_detalle_catalogo_seq; Type: SEQUENCE; Schema: beneficio; Owner: -
--

CREATE SEQUENCE beneficio.detalle_catalogo_id_detalle_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: detalle_catalogo_id_detalle_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: beneficio; Owner: -
--

ALTER SEQUENCE beneficio.detalle_catalogo_id_detalle_catalogo_seq OWNED BY beneficio.detalle_catalogo.id_detalle_catalogo;


--
-- Name: historial_cuenta; Type: TABLE; Schema: beneficio; Owner: -
--

CREATE TABLE beneficio.historial_cuenta (
    id_historial bigint NOT NULL,
    id_cuenta bigint NOT NULL,
    id_agricultor bigint NOT NULL,
    estado character varying(50),
    diferencia_total double precision,
    tolerancia double precision,
    fecha_registro timestamp without time zone
);


--
-- Name: historial_cuenta_id_historial_seq; Type: SEQUENCE; Schema: beneficio; Owner: -
--

CREATE SEQUENCE beneficio.historial_cuenta_id_historial_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historial_cuenta_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: beneficio; Owner: -
--

ALTER SEQUENCE beneficio.historial_cuenta_id_historial_seq OWNED BY beneficio.historial_cuenta.id_historial;


--
-- Name: parcialidad_beneficio; Type: TABLE; Schema: beneficio; Owner: -
--

CREATE TABLE beneficio.parcialidad_beneficio (
    id_parcialidad_beneficio bigint NOT NULL,
    estado character varying(255),
    fecha_registro timestamp(6) without time zone,
    id_parcialidad_agricultor bigint,
    id_pesaje_agricultor bigint,
    observaciones character varying(255),
    peso double precision,
    id_cuenta bigint NOT NULL,
    boleta boolean,
    cui_transportista character varying(13),
    detalle character varying(150),
    diferencia_peso double precision,
    estado_transporte integer,
    estado_transportista integer,
    fecha_boleta timestamp(6) without time zone,
    fecha_peso_bascula timestamp(6) without time zone,
    fecha_recepcion_parcialidad timestamp(6) without time zone,
    nombre_transportista character varying(150),
    observacion_transporte character varying(255),
    observacion_transportista character varying(255),
    peso_bascula double precision,
    peso_enviado double precision,
    placa_transporte character varying(20),
    tipo_medida character varying(50)
);


--
-- Name: parcialidad_beneficio_id_parcialidad_beneficio_seq; Type: SEQUENCE; Schema: beneficio; Owner: -
--

CREATE SEQUENCE beneficio.parcialidad_beneficio_id_parcialidad_beneficio_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: parcialidad_beneficio_id_parcialidad_beneficio_seq; Type: SEQUENCE OWNED BY; Schema: beneficio; Owner: -
--

ALTER SEQUENCE beneficio.parcialidad_beneficio_id_parcialidad_beneficio_seq OWNED BY beneficio.parcialidad_beneficio.id_parcialidad_beneficio;


--
-- Name: transito; Type: TABLE; Schema: beneficio; Owner: -
--

CREATE TABLE beneficio.transito (
    id_transito bigint NOT NULL,
    hora_llegada_est timestamp(6) without time zone,
    hora_llegada_real timestamp(6) without time zone,
    hora_salida timestamp(6) without time zone,
    id_cuenta bigint NOT NULL,
    id_estado_transito bigint,
    cui_transportista character varying(13) NOT NULL,
    estado_transporte integer NOT NULL,
    estado_transportista integer NOT NULL,
    fecha_registro timestamp(6) without time zone,
    nombre_transportista character varying(150) NOT NULL,
    observacion_transporte character varying(255),
    observacion_transportista character varying(255),
    placa character varying(20) NOT NULL
);


--
-- Name: transito_id_transito_seq; Type: SEQUENCE; Schema: beneficio; Owner: -
--

CREATE SEQUENCE beneficio.transito_id_transito_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transito_id_transito_seq; Type: SEQUENCE OWNED BY; Schema: beneficio; Owner: -
--

ALTER SEQUENCE beneficio.transito_id_transito_seq OWNED BY beneficio.transito.id_transito;


--
-- Name: catalogo; Type: TABLE; Schema: pesocabal; Owner: -
--

CREATE TABLE pesocabal.catalogo (
    id_catalogo bigint NOT NULL,
    descripcion character varying(255),
    nombre_categoria character varying(255) NOT NULL
);


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE; Schema: pesocabal; Owner: -
--

CREATE SEQUENCE pesocabal.catalogo_id_catalogo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: pesocabal; Owner: -
--

ALTER SEQUENCE pesocabal.catalogo_id_catalogo_seq OWNED BY pesocabal.catalogo.id_catalogo;


--
-- Name: usuario; Type: TABLE; Schema: pesocabal; Owner: -
--

CREATE TABLE pesocabal.usuario (
    id_usuario bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    contrasena character varying(255) NOT NULL,
    id_rol integer NOT NULL,
    estado integer NOT NULL,
    id_agricultor integer
);


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: pesocabal; Owner: -
--

CREATE SEQUENCE pesocabal.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: pesocabal; Owner: -
--

ALTER SEQUENCE pesocabal.usuario_id_usuario_seq OWNED BY pesocabal.usuario.id_usuario;


--
-- Name: agricultor id_agricultor; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.agricultor ALTER COLUMN id_agricultor SET DEFAULT nextval('agricultor.agricultor_id_agricultor_seq'::regclass);


--
-- Name: catalogo id_catalogo; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.catalogo ALTER COLUMN id_catalogo SET DEFAULT nextval('agricultor.catalogo_id_catalogo_seq'::regclass);


--
-- Name: color id_catalogo; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.color ALTER COLUMN id_catalogo SET DEFAULT nextval('agricultor.color_id_catalogo_seq'::regclass);


--
-- Name: detalle_catalogo id_detalle_catalogo; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.detalle_catalogo ALTER COLUMN id_detalle_catalogo SET DEFAULT nextval('agricultor.detalle_catalogo_id_detalle_catalogo_seq'::regclass);


--
-- Name: licencia id_catalogo; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.licencia ALTER COLUMN id_catalogo SET DEFAULT nextval('agricultor.licencia_id_catalogo_seq'::regclass);


--
-- Name: linea id_catalogo; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.linea ALTER COLUMN id_catalogo SET DEFAULT nextval('agricultor.linea_id_catalogo_seq'::regclass);


--
-- Name: marca id_catalogo; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.marca ALTER COLUMN id_catalogo SET DEFAULT nextval('agricultor.marca_id_catalogo_seq'::regclass);


--
-- Name: modelo id_catalogo; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.modelo ALTER COLUMN id_catalogo SET DEFAULT nextval('agricultor.modelo_id_catalogo_seq'::regclass);


--
-- Name: parcialidad id_parcialidad; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.parcialidad ALTER COLUMN id_parcialidad SET DEFAULT nextval('agricultor.parcialidad_id_parcialidad_seq'::regclass);


--
-- Name: pesaje id_pesaje; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.pesaje ALTER COLUMN id_pesaje SET DEFAULT nextval('agricultor.pesaje_id_pesaje_seq'::regclass);


--
-- Name: transportes id_transporte; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes ALTER COLUMN id_transporte SET DEFAULT nextval('agricultor.transportes_id_transporte_seq'::regclass);


--
-- Name: transportista id_transportista; Type: DEFAULT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportista ALTER COLUMN id_transportista SET DEFAULT nextval('agricultor.transportista_id_transportista_seq'::regclass);


--
-- Name: bitacora id_bitacora; Type: DEFAULT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.bitacora ALTER COLUMN id_bitacora SET DEFAULT nextval('beneficio.bitacora_id_bitacora_seq'::regclass);


--
-- Name: catalogo id_catalogo; Type: DEFAULT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.catalogo ALTER COLUMN id_catalogo SET DEFAULT nextval('beneficio.catalogo_id_catalogo_seq'::regclass);


--
-- Name: cuenta id_cuenta; Type: DEFAULT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.cuenta ALTER COLUMN id_cuenta SET DEFAULT nextval('beneficio.cuenta_id_cuenta_seq'::regclass);


--
-- Name: detalle_catalogo id_detalle_catalogo; Type: DEFAULT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.detalle_catalogo ALTER COLUMN id_detalle_catalogo SET DEFAULT nextval('beneficio.detalle_catalogo_id_detalle_catalogo_seq'::regclass);


--
-- Name: historial_cuenta id_historial; Type: DEFAULT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.historial_cuenta ALTER COLUMN id_historial SET DEFAULT nextval('beneficio.historial_cuenta_id_historial_seq'::regclass);


--
-- Name: parcialidad_beneficio id_parcialidad_beneficio; Type: DEFAULT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.parcialidad_beneficio ALTER COLUMN id_parcialidad_beneficio SET DEFAULT nextval('beneficio.parcialidad_beneficio_id_parcialidad_beneficio_seq'::regclass);


--
-- Name: transito id_transito; Type: DEFAULT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.transito ALTER COLUMN id_transito SET DEFAULT nextval('beneficio.transito_id_transito_seq'::regclass);


--
-- Name: catalogo id_catalogo; Type: DEFAULT; Schema: pesocabal; Owner: -
--

ALTER TABLE ONLY pesocabal.catalogo ALTER COLUMN id_catalogo SET DEFAULT nextval('pesocabal.catalogo_id_catalogo_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: pesocabal; Owner: -
--

ALTER TABLE ONLY pesocabal.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('pesocabal.usuario_id_usuario_seq'::regclass);


--
-- Data for Name: agricultor; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.agricultor (id_agricultor, direccion, fecha_creacion, nit, nombre, telefono) FROM stdin;
1	San Juan Sacatep├⌐quez, Guatemala	2026-05-18 02:30:04.345138	1234567-8	Juan Perez	55554444
\.


--
-- Data for Name: catalogo; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.catalogo (id_catalogo, descripcion, nombre_catalogo) FROM stdin;
1	Estados de pesaje	ESTADO_PESAJE
2	Medidas de peso	MEDIDA_PESO
3	Tipos de licencia	TIPO_LICENCIA
\.


--
-- Data for Name: color; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.color (id_catalogo, id_catalogo_publico, nombre) FROM stdin;
1	1	Blanco
2	2	Negro
3	3	Rojo
\.


--
-- Data for Name: detalle_catalogo; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.detalle_catalogo (id_detalle_catalogo, codigo, factor_conversion, orden, valor, id_catalogo) FROM stdin;
1	CUENTA_CREADA	\N	1	Cuenta Creada	1
2	PESAJE_INICIADO	\N	2	Pesaje Iniciado	1
3	PESAJE_FINALIZADO	\N	3	Pesaje Finalizado	1
7	A	\N	1	Tipo A	3
8	B	\N	2	Tipo B	3
9	C	\N	3	Tipo C	3
4	QUINTAL	45.3592	1	Quintal	2
5	KILOGRAMO	1	2	Kilogramo	2
6	LIBRA	0.453592	3	Libra	2
\.


--
-- Data for Name: licencia; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.licencia (id_catalogo, id_catalogo_publico, nombre) FROM stdin;
1	1	Tipo A
2	2	Tipo B
3	3	Tipo C
4	4	Tipo M
\.


--
-- Data for Name: linea; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.linea (id_catalogo, id_catalogo_publico, nombre) FROM stdin;
1	1	Hilux
2	2	Frontier
3	3	L200
\.


--
-- Data for Name: marca; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.marca (id_catalogo, id_catalogo_publico, nombre) FROM stdin;
1	1	Toyota
2	2	Nissan
3	3	Mitsubishi
\.


--
-- Data for Name: modelo; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.modelo (id_catalogo, id_catalogo_publico, nombre) FROM stdin;
1	1	2020
2	2	2021
3	3	2022
4	4	2023
\.


--
-- Data for Name: parcialidad; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.parcialidad (id_parcialidad, diferencia_peso, fecha_recepcion, hora_recepcion, id_transportista, observaciones, peso_actual, placa, estado, id_pesaje, id_cuenta) FROM stdin;
1	0	2026-05-28	11:48:59.938	1	Primer parcialidad, cuenta 1	250	P332KYD	2	1	1
\.


--
-- Data for Name: pesaje; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.pesaje (id_pesaje, cantidad_parcialidades, fecha, no_cuenta, observaciones, peso_total_actual, id_agricultor, estado, medida, id_cuenta) FROM stdin;
1	1	2026-05-28 11:47:44.39592	\N	Primer pesaje	500	1	2	5	1
\.


--
-- Data for Name: transportes; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.transportes (id_transporte, disponible, estado, observaciones, pesaje_asociado, placa, id_agricultor, id_color, id_linea, id_marca, id_modelo) FROM stdin;
1	t	1	Primer transporte	\N	P332KYD	1	1	1	1	1
\.


--
-- Data for Name: transportista; Type: TABLE DATA; Schema: agricultor; Owner: -
--

COPY agricultor.transportista (id_transportista, cui, disponible, estado, fecha_nacimiento, fecha_venci_licencia, nombre, pesaje_asociado, id_agricultor, tipo_licencia) FROM stdin;
1	2837279850110	t	1	2004-03-13	2028-03-12	Julio Abrahan Chet Chamale	\N	1	2
\.


--
-- Data for Name: bitacora; Type: TABLE DATA; Schema: beneficio; Owner: -
--

COPY beneficio.bitacora (id_bitacora, operacion, usuario, cuenta, observacion, fecha_sistema, balance, codigo_peso, estado, extemporaneo, medida, parcial, peso_observado, peso_real, transporte, transportista) FROM stdin;
1	CREAR_CUENTA	sistema	4	Cuenta creada para agricultor 123456789	2026-05-19 03:51:26.506421	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2	CREAR_CUENTA	sistema	5	Cuenta creada para agricultor 123456789	2026-05-19 03:57:02.228192	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
3	CREAR_CUENTA	sistema	6	Cuenta creada para agricultor 123456789	2026-05-19 04:05:54.126487	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
4	CREAR_CUENTA	sistema	7	Cuenta creada para agricultor 123456789	2026-05-19 04:05:55.572497	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	CREAR_CUENTA	sistema	8	Cuenta creada para agricultor 123456789	2026-05-19 04:05:56.875506	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
6	CREAR_CUENTA	sistema	9	Se cre├│ la cuenta ID 9	2026-05-19 04:13:52.806894	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
7	REGISTRAR_TRANSITO	sistema	4	Se registr├│ tr├ínsito para la placa 123ABC	2026-05-22 06:06:30.349938	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
8	CAMBIAR_ESTADO_TRANSPORTE	sistema	4	El estado del transporte 123ABC se actualiz├│ con ├⌐xito	2026-05-22 06:07:11.59243	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
9	CAMBIAR_ESTADO_TRANSPORTISTA	sistema	4	El estado del transportista 1234567890123 se actualiz├│ con ├⌐xito	2026-05-22 06:07:35.256129	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
47	REGISTRAR_TRANSITO	sistema	4	Se registr├│ tr├ínsito para la placa P123ABC	2026-05-22 08:22:49.019588	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
49	CAMBIAR_ESTADO_TRANSPORTE	sistema	4	El estado del transporte P123ABC se actualiz├│ con ├⌐xito	2026-05-22 08:23:34.960983	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
50	CAMBIAR_ESTADO_TRANSPORTISTA	sistema	4	El estado del transportista 1234567890123 se actualiz├│ con ├⌐xito	2026-05-22 08:23:53.229298	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
51	CREAR_CUENTA	micro-agricultor	12	Se cre├│ la cuenta ID 12	2026-05-22 08:46:05.060191	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
52	CAMBIAR_ESTADO_CUENTA	sistema	12	La cuenta ID 12 cambi├│ a CUENTA_CERRADA	2026-05-22 08:48:51.374705	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
53	CAMBIAR_ESTADO_CUENTA	sistema	12	La cuenta ID 12 cambi├│ a CUENTA_CONFIRMADA	2026-05-22 08:50:59.474881	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
54	CREAR_CUENTA	micro-agricultor	13	Se cre├│ la cuenta ID 13	2026-05-22 08:54:22.309371	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
55	CAMBIAR_ESTADO_CUENTA	sistema	13	La cuenta ID 13 cambi├│ a CUENTA_CERRADA	2026-05-22 08:56:44.709234	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
56	CAMBIAR_ESTADO_CUENTA	sistema	13	La cuenta ID 13 cambi├│ a CUENTA_CONFIRMADA	2026-05-22 08:57:14.006084	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
57	CREAR_CUENTA	micro-agricultor	14	Se cre├│ la cuenta ID 14 con peso objetivo 1000.0	2026-05-22 09:48:25.634227	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
58	RECIBIR_PARCIALIDAD	micro-agricultor	14	Parcialidad aceptada. Peso recibido: 400.0, acumulado: 400.0, saldo: 600.0	2026-05-22 09:50:39.842788	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
59	RECIBIR_PARCIALIDAD	micro-agricultor	14	Parcialidad aceptada. Peso recibido: 300.0, acumulado: 700.0, saldo: 300.0	2026-05-22 09:52:10.754649	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
60	RECIBIR_PARCIALIDAD	micro-agricultor	14	Parcialidad aceptada. Peso recibido: 305.0, acumulado: 1005.0, saldo: -5.0	2026-05-22 09:53:06.680584	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
61	CREAR_CUENTA	micro-agricultor	15	Se cre├│ la cuenta ID 15 con peso objetivo 1000.0	2026-05-22 09:56:01.168812	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
62	RECIBIR_PARCIALIDAD	micro-agricultor	15	Parcialidad aceptada. Peso recibido: 400.0, acumulado: 400.0, saldo: 600.0	2026-05-22 09:56:36.605591	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
63	RECIBIR_PARCIALIDAD	micro-agricultor	15	Parcialidad aceptada. Peso recibido: 300.0, acumulado: 700.0, saldo: 300.0	2026-05-22 09:57:04.606961	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
64	RECHAZAR_PARCIALIDAD	micro-agricultor	15	Parcialidad rechazada. Peso recibido: 310.0, acumulado actual: 700.0, objetivo: 1000.0	2026-05-22 09:57:34.531254	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
65	CREAR_CUENTA	micro-agricultor	16	Se cre├│ la cuenta ID 16	2026-05-23 18:39:31.790067	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
66	RECIBIR_PARCIALIDAD	micro-agricultor	16	Parcialidad 7 recibida	2026-05-23 18:41:44.748232	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
67	RECIBIR_PARCIALIDAD	micro-agricultor	16	Parcialidad 8 recibida	2026-05-23 18:51:58.349714	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
68	RECIBIR_PARCIALIDAD	micro-agricultor	16	Parcialidad 11 recibida	2026-05-23 19:07:18.837409	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
69	CREAR_CUENTA	micro-agricultor	17	Se cre├│ la cuenta ID 17	2026-05-23 19:11:36.639975	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
70	RECIBIR_PARCIALIDAD	micro-agricultor	17	Parcialidad 12 recibida	2026-05-23 19:12:14.147354	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
71	RECIBIR_PARCIALIDAD	micro-agricultor	17	Parcialidad 13 recibida	2026-05-23 19:12:48.407641	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
72	RECIBIR_PARCIALIDAD	micro-agricultor	17	Parcialidad 14 recibida	2026-05-23 19:14:41.281769	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
73	CREAR_CUENTA	micro-agricultor	18	Se cre├│ la cuenta ID 18	2026-05-23 19:20:59.989756	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
74	RECIBIR_PARCIALIDAD	micro-agricultor	18	Parcialidad 15 recibida	2026-05-23 19:21:46.797018	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
75	RECIBIR_PARCIALIDAD	micro-agricultor	18	Parcialidad 16 recibida	2026-05-23 19:22:11.211175	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
76	RECIBIR_PARCIALIDAD	micro-agricultor	18	Parcialidad 17 recibida	2026-05-23 19:22:26.57122	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
77	CREAR_CUENTA	micro-agricultor	19	Se cre├│ la cuenta ID 19	2026-05-26 02:24:54.59755	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
78	RECIBIR_PARCIALIDAD	micro-agricultor	19	Parcialidad 18 recibida	2026-05-26 02:25:29.053931	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
79	RECIBIR_PARCIALIDAD	micro-agricultor	19	Parcialidad 19 recibida	2026-05-26 02:26:49.203599	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
80	RECIBIR_PARCIALIDAD	micro-agricultor	19	Parcialidad 20 recibida	2026-05-26 02:27:35.348693	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
81	CAMBIAR_ESTADO_CUENTA	sistema	19	La cuenta ID 19 cambi├│ a CUENTA_CERRADA	2026-05-26 02:33:02.5335	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
82	ACTUALIZAR_PESO_BASCULA	peso-cabal	19	Se actualiz├│ peso b├íscula de parcialidad 18	2026-05-26 02:53:11.570974	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
83	GENERAR_BOLETA	peso-cabal	19	Se gener├│ boleta de parcialidad 18	2026-05-26 02:53:42.3879	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
84	CAMBIAR_ESTADO	sistema	19	CUENTA_CONFIRMADA	2026-05-26 03:54:28.081218	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
85	CREAR_CUENTA	micro-agricultor	20	Cuenta creada	2026-05-27 04:14:52.759308	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
86	CREAR_CUENTA	sistema	21	Cuenta creada	2026-05-27 04:18:19.446212	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
87	CREAR_CUENTA	sistema	22	Cuenta creada	2026-05-27 04:21:29.153685	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
88	CREAR_CUENTA	sistema	1	Cuenta creada	2026-05-27 07:04:34.428249	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
89	INICIAR_PESAJE_CUENTA	micro-agricultor	1	Cuenta marcada como pesaje iniciado	2026-05-28 11:47:45.093432	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
90	REGISTRAR_PARCIALIDAD_DESDE_AGRICULTOR	micro-agricultor	1	Parcialidad 1 pendiente de recepci├│n	2026-05-28 11:49:00.270723	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
91	RECIBIR_PARCIALIDAD_BENEFICIO	beneficio	1	Parcialidad 1 recibida	2026-05-28 20:20:21.698231	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
92	ACTUALIZAR_PESO_BASCULA	peso-cabal	1	Peso cabal parcialidad 1	2026-05-28 20:21:54.04406	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
93	GENERAR_BOLETA	peso-cabal	1	Boleta parcialidad 1	2026-05-28 20:22:18.715315	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: catalogo; Type: TABLE DATA; Schema: beneficio; Owner: -
--

COPY beneficio.catalogo (id_catalogo, descripcion, nombre_catalogo) FROM stdin;
\.


--
-- Data for Name: cuenta; Type: TABLE DATA; Schema: beneficio; Owner: -
--

COPY beneficio.cuenta (id_cuenta, id_agricultor, peso_total, cantidad_parcialidades, fecha_envio, estado, fecha_llegada, diferencia_total, resultado_tolerancia, tolerancia, peso_acumulado, peso_objetivo, saldo_pendiente, peso_bascula_total) FROM stdin;
1	1	\N	1	2026-05-27 07:04:33.923259	PESAJE_INICIADO	\N	-250	\N	5	250	500	250	250
\.


--
-- Data for Name: detalle_catalogo; Type: TABLE DATA; Schema: beneficio; Owner: -
--

COPY beneficio.detalle_catalogo (id_detalle_catalogo, codigo, factor_conversion, orden, valor, id_catalogo) FROM stdin;
\.


--
-- Data for Name: historial_cuenta; Type: TABLE DATA; Schema: beneficio; Owner: -
--

COPY beneficio.historial_cuenta (id_historial, id_cuenta, id_agricultor, estado, diferencia_total, tolerancia, fecha_registro) FROM stdin;
1	1	1	CUENTA_CREADA	0	5	2026-05-27 07:04:34.367883
2	1	1	PESAJE_INICIADO	0	5	2026-05-28 11:47:44.69919
3	1	1	PESAJE_INICIADO	-250	5	2026-05-28 20:20:21.646593
\.


--
-- Data for Name: parcialidad_beneficio; Type: TABLE DATA; Schema: beneficio; Owner: -
--

COPY beneficio.parcialidad_beneficio (id_parcialidad_beneficio, estado, fecha_registro, id_parcialidad_agricultor, id_pesaje_agricultor, observaciones, peso, id_cuenta, boleta, cui_transportista, detalle, diferencia_peso, estado_transporte, estado_transportista, fecha_boleta, fecha_peso_bascula, fecha_recepcion_parcialidad, nombre_transportista, observacion_transporte, observacion_transportista, peso_bascula, peso_enviado, placa_transporte, tipo_medida) FROM stdin;
1	PESAJE_REALIZADO	\N	1	1	Peso registrado por Peso Cabal	\N	1	t	2837279850110	Boleta Generada	0	1	1	2026-05-28 20:22:18.712492	2026-05-28 20:21:54.035726	2026-05-28 20:20:21.542148	Julio Abrahan Chet Chamale	Primer transporte	\N	250	250	P332KYD	Kilogramo
\.


--
-- Data for Name: transito; Type: TABLE DATA; Schema: beneficio; Owner: -
--

COPY beneficio.transito (id_transito, hora_llegada_est, hora_llegada_real, hora_salida, id_cuenta, id_estado_transito, cui_transportista, estado_transporte, estado_transportista, fecha_registro, nombre_transportista, observacion_transporte, observacion_transportista, placa) FROM stdin;
\.


--
-- Data for Name: catalogo; Type: TABLE DATA; Schema: pesocabal; Owner: -
--

COPY pesocabal.catalogo (id_catalogo, descripcion, nombre_categoria) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: pesocabal; Owner: -
--

COPY pesocabal.usuario (id_usuario, nombre, contrasena, id_rol, estado, id_agricultor) FROM stdin;
4	nuevo	$2a$10$af2JhhDZpt1SLWntZXJJt.HBNXVQ/7O/ueNp9CSH1EmTgVLgy8Xr2	3	1	1
2	beneficio	$2a$10$af2JhhDZpt1SLWntZXJJt.HBNXVQ/7O/ueNp9CSH1EmTgVLgy8Xr2	1	1	\N
3	admin	$2a$10$af2JhhDZpt1SLWntZXJJt.HBNXVQ/7O/ueNp9CSH1EmTgVLgy8Xr2	2	1	\N
1	agricultor	$2a$10$af2JhhDZpt1SLWntZXJJt.HBNXVQ/7O/ueNp9CSH1EmTgVLgy8Xr2	3	1	1
\.


--
-- Name: agricultor_id_agricultor_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.agricultor_id_agricultor_seq', 1, false);


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.catalogo_id_catalogo_seq', 1, false);


--
-- Name: color_id_catalogo_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.color_id_catalogo_seq', 3, true);


--
-- Name: detalle_catalogo_id_detalle_catalogo_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.detalle_catalogo_id_detalle_catalogo_seq', 1, false);


--
-- Name: licencia_id_catalogo_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.licencia_id_catalogo_seq', 4, true);


--
-- Name: linea_id_catalogo_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.linea_id_catalogo_seq', 3, true);


--
-- Name: marca_id_catalogo_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.marca_id_catalogo_seq', 3, true);


--
-- Name: modelo_id_catalogo_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.modelo_id_catalogo_seq', 4, true);


--
-- Name: parcialidad_id_parcialidad_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.parcialidad_id_parcialidad_seq', 1, true);


--
-- Name: pesaje_id_pesaje_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.pesaje_id_pesaje_seq', 1, true);


--
-- Name: transportes_id_transporte_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.transportes_id_transporte_seq', 3, true);


--
-- Name: transportista_id_transportista_seq; Type: SEQUENCE SET; Schema: agricultor; Owner: -
--

SELECT pg_catalog.setval('agricultor.transportista_id_transportista_seq', 1, true);


--
-- Name: bitacora_id_bitacora_seq; Type: SEQUENCE SET; Schema: beneficio; Owner: -
--

SELECT pg_catalog.setval('beneficio.bitacora_id_bitacora_seq', 93, true);


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE SET; Schema: beneficio; Owner: -
--

SELECT pg_catalog.setval('beneficio.catalogo_id_catalogo_seq', 1, false);


--
-- Name: cuenta_id_cuenta_seq; Type: SEQUENCE SET; Schema: beneficio; Owner: -
--

SELECT pg_catalog.setval('beneficio.cuenta_id_cuenta_seq', 1, true);


--
-- Name: detalle_catalogo_id_detalle_catalogo_seq; Type: SEQUENCE SET; Schema: beneficio; Owner: -
--

SELECT pg_catalog.setval('beneficio.detalle_catalogo_id_detalle_catalogo_seq', 1, false);


--
-- Name: historial_cuenta_id_historial_seq; Type: SEQUENCE SET; Schema: beneficio; Owner: -
--

SELECT pg_catalog.setval('beneficio.historial_cuenta_id_historial_seq', 3, true);


--
-- Name: parcialidad_beneficio_id_parcialidad_beneficio_seq; Type: SEQUENCE SET; Schema: beneficio; Owner: -
--

SELECT pg_catalog.setval('beneficio.parcialidad_beneficio_id_parcialidad_beneficio_seq', 1, true);


--
-- Name: transito_id_transito_seq; Type: SEQUENCE SET; Schema: beneficio; Owner: -
--

SELECT pg_catalog.setval('beneficio.transito_id_transito_seq', 1, false);


--
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE SET; Schema: pesocabal; Owner: -
--

SELECT pg_catalog.setval('pesocabal.catalogo_id_catalogo_seq', 1, false);


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: pesocabal; Owner: -
--

SELECT pg_catalog.setval('pesocabal.usuario_id_usuario_seq', 4, true);


--
-- Name: agricultor agricultor_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.agricultor
    ADD CONSTRAINT agricultor_pkey PRIMARY KEY (id_agricultor);


--
-- Name: catalogo catalogo_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.catalogo
    ADD CONSTRAINT catalogo_pkey PRIMARY KEY (id_catalogo);


--
-- Name: color color_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.color
    ADD CONSTRAINT color_pkey PRIMARY KEY (id_catalogo);


--
-- Name: detalle_catalogo detalle_catalogo_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.detalle_catalogo
    ADD CONSTRAINT detalle_catalogo_pkey PRIMARY KEY (id_detalle_catalogo);


--
-- Name: licencia licencia_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.licencia
    ADD CONSTRAINT licencia_pkey PRIMARY KEY (id_catalogo);


--
-- Name: linea linea_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.linea
    ADD CONSTRAINT linea_pkey PRIMARY KEY (id_catalogo);


--
-- Name: marca marca_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (id_catalogo);


--
-- Name: modelo modelo_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (id_catalogo);


--
-- Name: parcialidad parcialidad_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.parcialidad
    ADD CONSTRAINT parcialidad_pkey PRIMARY KEY (id_parcialidad);


--
-- Name: pesaje pesaje_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.pesaje
    ADD CONSTRAINT pesaje_pkey PRIMARY KEY (id_pesaje);


--
-- Name: transportes transportes_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes
    ADD CONSTRAINT transportes_pkey PRIMARY KEY (id_transporte);


--
-- Name: transportista transportista_pkey; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportista
    ADD CONSTRAINT transportista_pkey PRIMARY KEY (id_transportista);


--
-- Name: transportes uk_ed29fep4g4rvsmyv41sco2vir; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes
    ADD CONSTRAINT uk_ed29fep4g4rvsmyv41sco2vir UNIQUE (placa);


--
-- Name: transportista uk_hlajj2pa83jm3tc0udvtexuwr; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportista
    ADD CONSTRAINT uk_hlajj2pa83jm3tc0udvtexuwr UNIQUE (cui);


--
-- Name: agricultor uk_sc4vdwhh3iibnt1biw9td2an0; Type: CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.agricultor
    ADD CONSTRAINT uk_sc4vdwhh3iibnt1biw9td2an0 UNIQUE (nit);


--
-- Name: bitacora bitacora_pkey; Type: CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.bitacora
    ADD CONSTRAINT bitacora_pkey PRIMARY KEY (id_bitacora);


--
-- Name: catalogo catalogo_pkey; Type: CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.catalogo
    ADD CONSTRAINT catalogo_pkey PRIMARY KEY (id_catalogo);


--
-- Name: cuenta cuenta_pkey; Type: CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.cuenta
    ADD CONSTRAINT cuenta_pkey PRIMARY KEY (id_cuenta);


--
-- Name: detalle_catalogo detalle_catalogo_pkey; Type: CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.detalle_catalogo
    ADD CONSTRAINT detalle_catalogo_pkey PRIMARY KEY (id_detalle_catalogo);


--
-- Name: historial_cuenta historial_cuenta_pkey; Type: CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.historial_cuenta
    ADD CONSTRAINT historial_cuenta_pkey PRIMARY KEY (id_historial);


--
-- Name: parcialidad_beneficio parcialidad_beneficio_pkey; Type: CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.parcialidad_beneficio
    ADD CONSTRAINT parcialidad_beneficio_pkey PRIMARY KEY (id_parcialidad_beneficio);


--
-- Name: transito transito_pkey; Type: CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.transito
    ADD CONSTRAINT transito_pkey PRIMARY KEY (id_transito);


--
-- Name: catalogo catalogo_pkey; Type: CONSTRAINT; Schema: pesocabal; Owner: -
--

ALTER TABLE ONLY pesocabal.catalogo
    ADD CONSTRAINT catalogo_pkey PRIMARY KEY (id_catalogo);


--
-- Name: usuario usuario_nombre_key; Type: CONSTRAINT; Schema: pesocabal; Owner: -
--

ALTER TABLE ONLY pesocabal.usuario
    ADD CONSTRAINT usuario_nombre_key UNIQUE (nombre);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: pesocabal; Owner: -
--

ALTER TABLE ONLY pesocabal.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: parcialidad fk1mkco4uugw07jd3q703uofcg0; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.parcialidad
    ADD CONSTRAINT fk1mkco4uugw07jd3q703uofcg0 FOREIGN KEY (estado) REFERENCES agricultor.detalle_catalogo(id_detalle_catalogo);


--
-- Name: transportes fk3bphjqf2vcigi1jp5oe4jk05l; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes
    ADD CONSTRAINT fk3bphjqf2vcigi1jp5oe4jk05l FOREIGN KEY (id_marca) REFERENCES agricultor.marca(id_catalogo);


--
-- Name: transportista fk4ygsd5dkvbab57nkkgs5yryx; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportista
    ADD CONSTRAINT fk4ygsd5dkvbab57nkkgs5yryx FOREIGN KEY (tipo_licencia) REFERENCES agricultor.licencia(id_catalogo);


--
-- Name: detalle_catalogo fk507xgyl99yye0pot0ngef1hrs; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.detalle_catalogo
    ADD CONSTRAINT fk507xgyl99yye0pot0ngef1hrs FOREIGN KEY (id_catalogo) REFERENCES agricultor.catalogo(id_catalogo);


--
-- Name: pesaje fk9tsekcm8ouqwng4dmo7yds2pm; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.pesaje
    ADD CONSTRAINT fk9tsekcm8ouqwng4dmo7yds2pm FOREIGN KEY (estado) REFERENCES agricultor.detalle_catalogo(id_detalle_catalogo);


--
-- Name: parcialidad fk_parcialidad_pesaje; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.parcialidad
    ADD CONSTRAINT fk_parcialidad_pesaje FOREIGN KEY (id_pesaje) REFERENCES agricultor.pesaje(id_pesaje);


--
-- Name: pesaje fkbc8x4s1irj3wr8ftb7fc6pqh8; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.pesaje
    ADD CONSTRAINT fkbc8x4s1irj3wr8ftb7fc6pqh8 FOREIGN KEY (medida) REFERENCES agricultor.detalle_catalogo(id_detalle_catalogo);


--
-- Name: transportista fkbpndoevcxv86lbvl6yxeq3x52; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportista
    ADD CONSTRAINT fkbpndoevcxv86lbvl6yxeq3x52 FOREIGN KEY (id_agricultor) REFERENCES agricultor.agricultor(id_agricultor);


--
-- Name: transportes fkgihggji7q5da93tv0sa1sko30; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes
    ADD CONSTRAINT fkgihggji7q5da93tv0sa1sko30 FOREIGN KEY (id_agricultor) REFERENCES agricultor.agricultor(id_agricultor);


--
-- Name: transportes fkhl45vyknri2j9s7on0j81uovn; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes
    ADD CONSTRAINT fkhl45vyknri2j9s7on0j81uovn FOREIGN KEY (id_modelo) REFERENCES agricultor.modelo(id_catalogo);


--
-- Name: pesaje fkj2lheaycapewtx2kywgcs190e; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.pesaje
    ADD CONSTRAINT fkj2lheaycapewtx2kywgcs190e FOREIGN KEY (id_agricultor) REFERENCES agricultor.agricultor(id_agricultor);


--
-- Name: transportes fklogvob5j1r2s1m6msit31ldqs; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes
    ADD CONSTRAINT fklogvob5j1r2s1m6msit31ldqs FOREIGN KEY (id_linea) REFERENCES agricultor.linea(id_catalogo);


--
-- Name: transportes fkoef25uwe1f58a201yg091oo8r; Type: FK CONSTRAINT; Schema: agricultor; Owner: -
--

ALTER TABLE ONLY agricultor.transportes
    ADD CONSTRAINT fkoef25uwe1f58a201yg091oo8r FOREIGN KEY (id_color) REFERENCES agricultor.color(id_catalogo);


--
-- Name: transito fk4621tfju8pltubtotq3k3x9kg; Type: FK CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.transito
    ADD CONSTRAINT fk4621tfju8pltubtotq3k3x9kg FOREIGN KEY (id_cuenta) REFERENCES beneficio.cuenta(id_cuenta);


--
-- Name: detalle_catalogo fk507xgyl99yye0pot0ngef1hrs; Type: FK CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.detalle_catalogo
    ADD CONSTRAINT fk507xgyl99yye0pot0ngef1hrs FOREIGN KEY (id_catalogo) REFERENCES beneficio.catalogo(id_catalogo);


--
-- Name: historial_cuenta fk_historial_cuenta; Type: FK CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.historial_cuenta
    ADD CONSTRAINT fk_historial_cuenta FOREIGN KEY (id_cuenta) REFERENCES beneficio.cuenta(id_cuenta);


--
-- Name: transito fkavndbfi6ws9k42a2utrvm3s47; Type: FK CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.transito
    ADD CONSTRAINT fkavndbfi6ws9k42a2utrvm3s47 FOREIGN KEY (id_estado_transito) REFERENCES beneficio.detalle_catalogo(id_detalle_catalogo);


--
-- Name: parcialidad_beneficio fkoubx5j3if1am3n9fyuchj6p0n; Type: FK CONSTRAINT; Schema: beneficio; Owner: -
--

ALTER TABLE ONLY beneficio.parcialidad_beneficio
    ADD CONSTRAINT fkoubx5j3if1am3n9fyuchj6p0n FOREIGN KEY (id_cuenta) REFERENCES beneficio.cuenta(id_cuenta);


--
-- PostgreSQL database dump complete
--


