package com.drabazha.sentence.builder.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SchemaWordResponse {

    private String speechPart;

    private String wordGender;
}
