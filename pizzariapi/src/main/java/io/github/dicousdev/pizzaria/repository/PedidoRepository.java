package io.github.dicousdev.pizzaria.repository;

import io.github.dicousdev.pizzaria.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
