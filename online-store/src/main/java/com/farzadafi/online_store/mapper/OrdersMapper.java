package com.farzadafi.online_store.mapper;

import com.farzadafi.online_store.dto.OrdersDto;
import com.farzadafi.online_store.model.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrdersMapper {

    OrdersMapper INSTANCE = Mappers.getMapper(OrdersMapper.class);

    Orders dtoToModel(OrdersDto ordersDto);
}
