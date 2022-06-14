package com.drabazha.sentence.builder.api.domain.nosql;

import com.drabazha.sentence.builder.api.domain.sql.SchemaWordType;
import com.drabazha.sentence.builder.api.dto.response.WordResponse;
import com.drabazha.sentence.builder.api.exception.RestException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "words")
public class Word {

    @Id
    private String content;

    private Long wordTypeId;

    public WordResponse mapToResponse(List<SchemaWordType> wordTypes) {
        return WordResponse.builder()
                .content(this.getContent())
                .wordTypeId(this.getWordTypeId())
                .wordTypeName(wordTypes.stream()
                        .filter(wordType ->
                                wordType.getSchemaWordTypeId()
                                        .equals(this.getWordTypeId()))
                        .findFirst().orElseThrow(() ->
                                new RestException(String.format("Word '%s' corrupted", getContent())))
                        .getSchemaWordTypeName())
                .build();
    }
}
