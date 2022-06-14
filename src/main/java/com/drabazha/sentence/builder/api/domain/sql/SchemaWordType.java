package com.drabazha.sentence.builder.api.domain.sql;

import com.drabazha.sentence.builder.api.dto.response.WordTypeResponse;
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
public class SchemaWordType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schemaWordTypeId;

    private String schemaWordTypeName;

    public WordTypeResponse mapToResponse() {
        return new WordTypeResponse(schemaWordTypeId, schemaWordTypeName);
    }
}
