INSERT INTO public.court(
	"name",
	alias,
	city,
	state
) VALUES (
	'Tribunal de Justiça do Espírito Santo',
	'TJES',
	'Vitória',
	'Espírito Santo'
);

INSERT INTO public.lawsuit (
	id,
	nature,
	judicial_branch,
	init_date,
	amount_in_controversy,
	court_id
) VALUES (
	'502XXXX-21.2021.8.08.0024',
	'Procedimento do juizado especial cível',
	'Justiça dos Estados e do Distrito Federal e Territórios',
	'2021-10-29',
	3000,
	1
);

INSERT INTO public.lawsuit_event (
	lawsuit_id,
	"date"
) VALUES
	( '502XXXX-21.2021.8.08.0024','2022-08-14'),
	( '502XXXX-21.2021.8.08.0024','2022-08-15'),
	( '502XXXX-21.2021.8.08.0024','2022-07-19');

INSERT INTO public.event_document (
	event_id,
	"label",
	description,
	created_at
) VALUES (
	1,
	'Andamento',
	'Expedição de Certidão',
	current_timestamp
	),
	(
		2,
		'Andamento',
		'Juntada de Petição de contrarrazões',
		current_timestamp
	),
	(
		3,
		'Andamento',
		'Expedição de Certidãos',
		current_timestamp
	),
	(
		3,
		'Andamento',
		'Expedição de intimação eletrônica',
		current_timestamp
	);

INSERT INTO public.subject (
	"name"
) VALUES
	('Responsabilidade Civil'),
	('Indenização por dano');

INSERT INTO public.lawsuit_subject (
	lawsuit_id,
	subject_id
) VALUES
	('502XXXX-21.2021.8.08.0024',1),
	('502XXXX-21.2021.8.08.0024', 2);

INSERT INTO public.lawyer (
	id,
	name
) VALUES
	('OAB 6739/ES','Jerize Terciano de Almeida'),
	('OAB 7716/MG', 'Ricardo Lopes Godoy');

INSERT INTO public.involved (
	lawsuit_id,
	perpetrator,
	acused,
	plaintif_lawyer_id,
	defendant_lawyer_id
) VALUES (
	'502XXXX-21.2021.8.08.0024',
	'Douglas Costa Koehler',
	'Banco do Brasil',
	'OAB 6739/ES',
	'OAB 7716/MG'
);