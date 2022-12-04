DROP TABLE if exists public.court CASCADE;
DROP TABLE if exists public.event_document CASCADE;
DROP TABLE if exists public.involved CASCADE;
DROP TABLE if exists public.lawsuit CASCADE;
DROP TABLE if exists public.lawsuit_event CASCADE;
DROP TABLE if exists public.lawsuit_subject CASCADE;
DROP TABLE if exists public.lawyer CASCADE;
DROP TABLE if exists public.subject CASCADE;

CREATE TABLE public.court (
	id SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	alias VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	state VARCHAR NOT NULL
);

CREATE TABLE public.subject (
	id SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL
);

CREATE TABLE public.lawyer (
	id VARCHAR NOT NULL PRIMARY KEY,
	"name" VARCHAR NOT NULL
);

CREATE TABLE public.lawsuit (
	id VARCHAR NOT NULL PRIMARY KEY,
	nature VARCHAR NOT NULL,
	judicial_branch VARCHAR NOT NULL,
	init_date DATE NOT NULL,
	amount_in_controversy numeric NOT NULL,
	court_id SERIAL REFERENCES public.court(id)
);

CREATE TABLE public.involved (
	lawsuit_id VARCHAR REFERENCES public.lawsuit(id) PRIMARY KEY,
	perpetrator VARCHAR NOT NULL,
	acused VARCHAR NOT NULL,
	plaintif_lawyer_id VARCHAR REFERENCES public.lawyer(id),
	defendant_lawyer_id VARCHAR REFERENCES public.lawyer(id)
);

CREATE TABLE public.lawsuit_subject (
	lawsuit_id VARCHAR REFERENCES public.lawsuit(id),
	subject_id SERIAL REFERENCES public.subject(id)
);

CREATE TABLE public.lawsuit_event (
	id SERIAL PRIMARY KEY,
	lawsuit_id VARCHAR REFERENCES public.lawsuit(id),
	"date" DATE NOT null,
    UNIQUE ("date", lawsuit_id)
);


CREATE TABLE public.event_document (
	event_id SERIAL REFERENCES public.lawsuit_event(id),
	"label" VARCHAR NOT NULL,
	description VARCHAR NOT NULL,
	created_at DATE NOT NULL
);