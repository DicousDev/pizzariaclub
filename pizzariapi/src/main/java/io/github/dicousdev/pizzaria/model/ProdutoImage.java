package io.github.dicousdev.pizzaria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "produto_image")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ProdutoImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String base64;
}
