package com.drabazha.sentence.builder.api.dto.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SchemaWordForm {

    private String speechPart;

    private String wordGender;

    private Integer wordOrder;
}
