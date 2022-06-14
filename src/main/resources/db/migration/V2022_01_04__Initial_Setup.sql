CREATE TABLE IF NOT EXISTS sentence_schema
(
    sentence_schema_id BIGSERIAL PRIMARY KEY,
    schema_hash        VARCHAR
);

CREATE TABLE IF NOT EXISTS schema_word_type
(
    schema_word_type_id   BIGSERIAL PRIMARY KEY,
    schema_word_type_name VARCHAR
);

CREATE TABLE IF NOT EXISTS schema_word
(
    schema_word_id     BIGSERIAL PRIMARY KEY,
    sentence_schema_id BIGINT,
    word_order         INTEGER,
    word_type_id       BIGINT
);

ALTER TABLE schema_word
    ADD CONSTRAINT schema_word_schema_word_type
        FOREIGN KEY (word_type_id)
            REFERENCES schema_word_type (schema_word_type_id) ON DELETE CASCADE;

ALTER TABLE schema_word
    ADD CONSTRAINT schema_word_sentence_schema
        FOREIGN KEY (sentence_schema_id)
            REFERENCES sentence_schema (sentence_schema_id) ON DELETE CASCADE;