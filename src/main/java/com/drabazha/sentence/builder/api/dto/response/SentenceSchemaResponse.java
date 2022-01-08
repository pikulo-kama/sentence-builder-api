package com.drabazha.sentence.builder.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SentenceSchemaResponse {

    private Long sentenceSchemaId;

    private List<SchemaWordResponse> words;
}
