<?php
// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$motdepasse = "";
$base = "gestion_gamesmaster";

$connexion = new mysqli($serveur, $utilisateur, $motdepasse, $base);

if ($connexion->connect_error) {
    die("Erreur de connexion : " . $connexion->connect_error);
}

$connexion->set_charset("utf8");
?>
