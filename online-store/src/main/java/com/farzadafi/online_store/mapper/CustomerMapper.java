package com.farzadafi.online_store.mapper;

import com.farzadafi.online_store.dto.CustomerDto;
import com.farzadafi.online_store.model.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerMapper {

    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    Customer dtoToModel(CustomerDto customerDto);
}
