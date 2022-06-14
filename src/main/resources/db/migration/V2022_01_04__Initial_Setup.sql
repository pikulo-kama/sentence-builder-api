CREATE TABLE IF NOT EXISTS sentence_schema
(
    sentence_schema_id BIGSERIAL PRIMARY KEY,
    schema_hash        VARCHAR
);

CREATE TABLE IF NOT EXISTS schema_word
(
    schema_word_id     BIGSERIAL PRIMARY KEY,
    sentence_schema_id BIGINT,
    word_order         INTEGER,
    speech_part        VARCHAR,
    word_gender        VARCHAR DEFAULT 'NO GENDER'
);

ALTER TABLE schema_word
    ADD CONSTRAINT schema_word_sentence_schema
        FOREIGN KEY (sentence_schema_id)
            REFERENCES sentence_schema (sentence_schema_id) ON DELETE CASCADE;