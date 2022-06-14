package com.drabazha.sentence.builder.api.domain.sql;

import com.drabazha.sentence.builder.api.dto.response.SentenceSchemaResponse;
import com.drabazha.sentence.builder.api.dto.response.WordTypeResponse;
import com.drabazha.sentence.builder.api.repository.SchemaWordRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;
import java.util.stream.Collectors;

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

    public SentenceSchemaResponse mapToResponse(SchemaWordRepository schemaWordRepository) {
        List<SchemaWord> words = schemaWordRepository
                .findSchemaWordsBySentenceSchemaIdOrderByWordOrder(this.getSentenceSchemaId());

        List<WordTypeResponse> wordResponseDtoList = words.stream()
                .map(word -> WordTypeResponse.builder()
                        .wordTypeId(word.getSchemaWordType().getSchemaWordTypeId())
                        .wordTypeName(word.getSchemaWordType().getSchemaWordTypeName())
                        .build())
                .collect(Collectors.toList());

        return SentenceSchemaResponse.builder()
                .words(wordResponseDtoList)
                .sentenceSchemaId(this.getSentenceSchemaId())
                .build();
    }
}
