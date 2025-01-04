import usePokemon from "./usePokemon";
const PokemonApp = () => {
  const {
    pokemonList,
    selectedPokemon,
    selectPokemonByName,
    goToNextPokemon,
    goToPreviousPokemon,
    hasNext,
    hasPrevious,
  } = usePokemon();

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", color: "#333" }}>Pokemon Selector</h1>

      {/* Dropdown selector */}
      <select
        onChange={(e) => selectPokemonByName(e.target.value)}
        value={selectedPokemon?.name || ""}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        {pokemonList.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>

      {/* Pokemon Card */}
      {selectedPokemon && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            margin: "20px 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
          />
          <h2 style={{ fontSize: "20px", color: "#555" }}>
            {selectedPokemon.name}
          </h2>
          {/* <p style={{ fontSize: "14px", color: "#777" }}>
            Height: {selectedPokemon.height}m | Weight: {selectedPokemon.weight}
            kg
          </p>
          <p style={{ fontSize: "14px", color: "#777" }}>
            Abilities:{" "}
            {selectedPokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p> */}
        </div>
      )}

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={goToPreviousPokemon}
          disabled={!hasPrevious}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            fontSize: "16px",
            backgroundColor: hasPrevious ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: hasPrevious ? "pointer" : "not-allowed",
          }}
        >
          Previous
        </button>
        <h2 style={{ fontSize: "20px", color: "#555" }}>
          {selectedPokemon.name}
        </h2>
        <button
          onClick={goToNextPokemon}
          disabled={!hasNext}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: hasNext ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: hasNext ? "pointer" : "not-allowed",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonApp;
