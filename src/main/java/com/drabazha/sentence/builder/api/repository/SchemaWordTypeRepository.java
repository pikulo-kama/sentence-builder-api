package com.drabazha.sentence.builder.api.repository;

import com.drabazha.sentence.builder.api.domain.sql.SchemaWordType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemaWordTypeRepository extends JpaRepository<SchemaWordType, Long> {

    List<SchemaWordType> findAllBySchemaWordTypeIdIn(List<Long> schemaWordTypeIdList);
}
