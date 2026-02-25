package io.github.dicousdev.pizzaria.controller.pedido;

import io.github.dicousdev.pizzaria.usecase.RegistraPedidoUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/pedidos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PedidoController {

    private final RegistraPedidoUseCase registraPedidoUseCase;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void registrar(@RequestBody @Valid PedidoForm form) {
        registraPedidoUseCase.execute(form);
    }
}
