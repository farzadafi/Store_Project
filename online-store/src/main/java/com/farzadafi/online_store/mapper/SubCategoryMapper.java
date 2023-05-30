package com.farzadafi.online_store.mapper;

import com.farzadafi.online_store.dto.SubCategoryDto;
import com.farzadafi.online_store.model.SubCategory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SubCategoryMapper {

    SubCategoryMapper INSTANCE = Mappers.getMapper(SubCategoryMapper.class);

    SubCategory dtoToModel(SubCategoryDto subCategoryDto);
}
