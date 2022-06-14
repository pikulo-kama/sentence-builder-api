package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.domain.sql.SchemaWordType;
import com.drabazha.sentence.builder.api.dto.form.WordTypeCreateForm;
import com.drabazha.sentence.builder.api.dto.response.WordTypeResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;

import java.util.List;

public interface WordTypeService {

    List<SchemaWordType> findAll();

    List<WordTypeResponse> findAllWordTypes();

    UserResponse createWordType(WordTypeCreateForm wordTypeCreateForm);

    UserResponse deleteWordType(Long wordTypeId);
}
