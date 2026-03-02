package io.github.dicousdev.pizzaria.controller.pedido;

import io.github.dicousdev.pizzaria.usecase.AlteraStatusPedidoUseCase;
import io.github.dicousdev.pizzaria.usecase.ConsultaPedidosUseCase;
import io.github.dicousdev.pizzaria.usecase.RegistraPedidoUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/pedidos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PedidoController {

    private final RegistraPedidoUseCase registraPedidoUseCase;
    private final ConsultaPedidosUseCase consultaPedidosUseCase;
    private final AlteraStatusPedidoUseCase alteraStatusPedidoUseCase;

    @GetMapping
    public List<PedidoResponseDto> getPedidos() {
        return consultaPedidosUseCase.execute();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void registrar(@RequestBody @Valid PedidoForm form) {
        registraPedidoUseCase.execute(form);
    }

    @PatchMapping("{id}")
    public void alteraStatus(@PathVariable("id") Long pedidoId, @RequestBody AlteraStatusPedidoForm form) {
        alteraStatusPedidoUseCase.execute(pedidoId, form.getToStatus());
    }
}
