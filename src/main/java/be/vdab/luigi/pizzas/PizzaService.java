package be.vdab.luigi.pizzas;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PizzaService {
    private final PizzaRepository pizzaRepository;
    private final PrijsRepository prijsRepository;

    public PizzaService(PizzaRepository pizzaRepository, PrijsRepository prijsRepository) {
        this.pizzaRepository = pizzaRepository;
        this.prijsRepository = prijsRepository;
    }

    public long findAantal() {
        return pizzaRepository.findAantal();
    }

    Optional<Pizza> findById(long id) {
        return pizzaRepository.findById(id);
    }

    public List<Pizza> findAll() {
        return pizzaRepository.findAll();
    }

    public List<Pizza> findByNaamBevat(String woord) {
        return pizzaRepository.findByNaamBevat(woord);
    }

    public List<Pizza> findByPrijsTussen(BigDecimal van, BigDecimal tot) {
        return pizzaRepository.findByPrijsTussen(van, tot);
    }

    @Transactional
    void delete(long id) {
        pizzaRepository.delete(id);
    }

    @Transactional
    long create(NieuwePizza nieuwePizza) {
        try {
            var winst = nieuwePizza.prijs().multiply(BigDecimal.valueOf(0.1));
            var pizza = new Pizza(0, nieuwePizza.naam(), nieuwePizza.prijs(), winst);
            var id = pizzaRepository.create(pizza);
            prijsRepository.create(new Prijs(pizza.getPrijs(), LocalDateTime.now(), id));
            return id;
        } catch (DuplicateKeyException ex) {
            throw new PizzaBestaatAlException(nieuwePizza.naam());
        }

//        var winst = nieuwePizza.prijs().multiply(BigDecimal.valueOf(0.1));
//        var pizza = new Pizza(0, nieuwePizza.naam(), nieuwePizza.prijs(), winst);
//        var id = pizzaRepository.create(pizza);
//        prijsRepository.create(new Prijs(pizza.getPrijs(), LocalDateTime.now(), id));
//        return id;
    }

    @Transactional
    void updatePrijs(Prijs prijs) {
        pizzaRepository.updatePrijs(prijs.getPizzaId(), prijs.getPrijs());
        prijsRepository.create(prijs);
    }

    List<Prijs> findPrijzen(long id) {
        return prijsRepository.findByPizzaId(id);
    }
}
