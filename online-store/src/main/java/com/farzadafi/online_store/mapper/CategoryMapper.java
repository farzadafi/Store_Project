package com.farzadafi.online_store.mapper;

import com.farzadafi.online_store.dto.CategoryDto;
import com.farzadafi.online_store.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    Category dtoToModel(CategoryDto categoryDto);
}
