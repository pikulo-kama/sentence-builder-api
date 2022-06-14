package com.drabazha.sentence.builder.api.domain.sql;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class SentenceSchema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sentenceSchemaId;

    private String schemaHash;
}
