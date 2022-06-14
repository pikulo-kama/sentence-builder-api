package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.dto.Dictionary;
import com.drabazha.sentence.builder.api.dto.form.WordCollectionForm;
import com.drabazha.sentence.builder.api.dto.form.WordDeleteForm;
import com.drabazha.sentence.builder.api.dto.response.WordGroupCollectionResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;

public interface WordService {

    UserResponse create(WordCollectionForm wordCollectionForm);

    UserResponse delete(WordDeleteForm wordDeleteForm);

    WordGroupCollectionResponse findAllAndGroup();

    Dictionary createDictionary();
}
