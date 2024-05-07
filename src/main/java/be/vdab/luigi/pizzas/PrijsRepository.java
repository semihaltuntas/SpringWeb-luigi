package be.vdab.luigi.pizzas;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PrijsRepository {
    private final JdbcClient jdbcClient;

    public PrijsRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    void create(Prijs prijs) {
        var sql = """
                insert into prijzen(prijs,vanaf,pizzaId)
                values(?,?,?)
                """;
        jdbcClient.sql(sql)
                .params(prijs.getPrijs(), prijs.getVanaf(), prijs.getPizzaId())
                .update();
    }

    List<Prijs> findByPizzaId(long id) {
        var sql = """
                select prijs,vanaf,pizzaId
                from prijzen
                where pizzaId = ?
                order by vanaf
                """;
        return jdbcClient.sql(sql)
                .param(id)
                .query(Prijs.class)
                .list();
    }
}
