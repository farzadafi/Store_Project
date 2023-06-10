package com.farzadafi.online_store.mapper;

import com.farzadafi.online_store.dto.OrdersDto;
import com.farzadafi.online_store.dto.OrdersDtoResponse;
import com.farzadafi.online_store.model.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OrdersMapper {

    OrdersMapper INSTANCE = Mappers.getMapper(OrdersMapper.class);

    Orders dtoToModel(OrdersDto ordersDto);

    List<OrdersDtoResponse> modelsToDtos(List<Orders> ordersList);
}
