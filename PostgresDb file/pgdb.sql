PGDMP         	                y           ASC    13.4    13.4     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16411    ASC    DATABASE     i   CREATE DATABASE "ASC" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "ASC";
                postgres    false            ?            1259    32808    device    TABLE     ?   CREATE TABLE public.device (
    id integer NOT NULL,
    devicename character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL
);
    DROP TABLE public.device;
       public         heap    postgres    false            ?            1259    32806    device_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.device_id_seq;
       public          postgres    false    203            ?           0    0    device_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.device_id_seq OWNED BY public.device.id;
          public          postgres    false    202            ?            1259    24605    register    TABLE     ?   CREATE TABLE public.register (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.register;
       public         heap    postgres    false            ?            1259    24603    register_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.register_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.register_id_seq;
       public          postgres    false    201            ?           0    0    register_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.register_id_seq OWNED BY public.register.id;
          public          postgres    false    200            +           2604    32811 	   device id    DEFAULT     f   ALTER TABLE ONLY public.device ALTER COLUMN id SET DEFAULT nextval('public.device_id_seq'::regclass);
 8   ALTER TABLE public.device ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            *           2604    24608    register id    DEFAULT     j   ALTER TABLE ONLY public.register ALTER COLUMN id SET DEFAULT nextval('public.register_id_seq'::regclass);
 :   ALTER TABLE public.register ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            ?          0    32808    device 
   TABLE DATA           E   COPY public.device (id, devicename, latitude, longitude) FROM stdin;
    public          postgres    false    203   ?       ?          0    24605    register 
   TABLE DATA           7   COPY public.register (id, email, password) FROM stdin;
    public          postgres    false    201   "       ?           0    0    device_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.device_id_seq', 22, true);
          public          postgres    false    202            ?           0    0    register_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.register_id_seq', 46, true);
          public          postgres    false    200            /           2606    32816    device device_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.device DROP CONSTRAINT device_pkey;
       public            postgres    false    203            -           2606    24613    register register_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.register
    ADD CONSTRAINT register_pkey PRIMARY KEY (email);
 @   ALTER TABLE ONLY public.register DROP CONSTRAINT register_pkey;
       public            postgres    false    201            ?   H   x??9?0?zy?A?/??HN???U?v4???u?M-m??V??w?t?`}Zn)?:hl?gKʦ"? e??      ?   ,   x?31?,I-.q(??M-???K?K???LLJN1426?????? ??
?     