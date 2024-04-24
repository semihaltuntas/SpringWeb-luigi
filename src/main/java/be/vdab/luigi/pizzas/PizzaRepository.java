package be.vdab.luigi.pizzas;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class PizzaRepository {
    private final JdbcClient jdbcClient;

    public PizzaRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }
    public long findAantal(){
        String sql = """
                select count(*) as aantalPizzas
                from pizzas
                """;
        return jdbcClient.sql(sql)
                .query(Long.class)
                .single();
    }
}
