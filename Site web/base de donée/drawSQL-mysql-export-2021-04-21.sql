CREATE TABLE `Equipe`(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    `Nom` VARCHAR(255) NOT NULL UNIQUE,
    `CheminMaillotDom` VARCHAR(255) NULL,
    `CheminMaillotExt` VARCHAR(255) NULL,
    `CheminMaillotNeutre` VARCHAR(255) NULL,
    `CheminLogo` VARCHAR(255) NULL,
     PRIMARY KEY( Id )
);
CREATE TABLE `Joueurs`(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    `Nom` VARCHAR(255) NOT NULL UNIQUE,
    `Equipe` INT UNSIGNED NOT NULL,
    `Poste` VARCHAR(255) NOT NULL,
    `Numéro` INT NOT NULL,
     PRIMARY KEY( Id )
);
CREATE TABLE `Match`(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Id_équipe_Domicile` INT UNSIGNED NOT NULL,
    `Id_équipe_Exterieur` INT UNSIGNED NOT NULL,
    `Id_Arbitre_Principal` INT UNSIGNED NOT NULL,
    `Id_Arbitre_1` INT UNSIGNED NOT NULL,
    `Id_Arbitre_2` INT UNSIGNED NOT NULL,
    `Date` DATE NOT NULL,
    `Lieu` INT UNSIGNED NOT NULL,    
    `Heure_1ere_mi-temps` TIME NOT NULL,
    `Heure_2eme_mi-temps` TIME NOT NULL,
    PRIMARY KEY( Id )
);
CREATE TABLE `Titulaire`(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Id_Joueurs` INT UNSIGNED NOT NULL,
    `Match` INT UNSIGNED NOT NULL,
    `Joue?` INT NOT NULL,
    `Poste?` VARCHAR(255) NOT NULL,
    `Position?` INT NULL,
    PRIMARY KEY( Id )
);
CREATE TABLE `But`(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Id_Joueurs` INT UNSIGNED NOT NULL,
    `Date` TIME NOT NULL,
    `Match` INT UNSIGNED NOT NULL,
    `Equipe` INT UNSIGNED NOT NULL,
    PRIMARY KEY( Id )
);
CREATE TABLE `Fautes`(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Id_Joueurs` INT UNSIGNED NOT NULL,
    `Catégorie` VARCHAR(255) NOT NULL,
    `Equipe` INT UNSIGNED NOT NULL,    
	`Match` INT UNSIGNED NOT NULL,
    `Temps` TIME NOT NULL,
    PRIMARY KEY( Id )
);
CREATE TABLE `Sortie`(
    `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    `Joueur_sortant` INT UNSIGNED NOT NULL,
    `Joueur_rentrant` INT UNSIGNED NULL,
	`Catégorie` VARCHAR(255) NOT NULL,
    `Match` INT UNSIGNED NOT NULL,
    `Temps_du_match` TIME NOT NULL,    
    `Temps_de_sortie` TIME NULL,
    PRIMARY KEY( Id )
);
CREATE TABLE `Stade`(
`Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
`Nom` VARCHAR(255) NOT NULL,
`Ville` VARCHAR(255) NOT NULL,
PRIMARY KEY( Id )
);
CREATE TABLE `Arbitres`(
	`Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Nom` VARCHAR(255) NOT NULL,   
    `Nationalité` VARCHAR(255) NOT NULL,
    PRIMARY KEY( Id )
);
ALTER TABLE
    `Match` ADD CONSTRAINT `match_id_équipe_Domicile_foreign` FOREIGN KEY(`Id_équipe_Domicile`) REFERENCES `Equipe`(`Id`);
ALTER TABLE
    `Match` ADD CONSTRAINT `match_id_équipe_Exterieur_foreign` FOREIGN KEY(`Id_équipe_Exterieur`) REFERENCES `Equipe`(`Id`);
ALTER TABLE
    `Match` ADD CONSTRAINT `match_Arbitre_Principal_foreign` FOREIGN KEY(`Id_Arbitre_Principal`) REFERENCES `Arbitres`(`Id`);
ALTER TABLE
    `Match` ADD CONSTRAINT `match_Arbitre_1_foreign` FOREIGN KEY(`Id_Arbitre_1`) REFERENCES `Arbitres`(`Id`);
ALTER TABLE
    `Match` ADD CONSTRAINT `match_Arbitre_2_foreign` FOREIGN KEY(`Id_Arbitre_2`) REFERENCES `Arbitres`(`Id`);
ALTER TABLE
    `Match` ADD CONSTRAINT ` Match_Lieu_foreign`  FOREIGN KEY(`Lieu`) REFERENCES `Stade`(`Id`);
ALTER TABLE
    `Joueurs` ADD CONSTRAINT `joueurs_équipe_foreign` FOREIGN KEY(`Equipe`) REFERENCES `Equipe`(`Id`);
ALTER TABLE
    `Titulaire` ADD CONSTRAINT `titulaire_match_foreign` FOREIGN KEY(`Match`) REFERENCES `Match`(`Id`);
ALTER TABLE
    `Titulaire` ADD CONSTRAINT `titulaire_id_joueurs_foreign` FOREIGN KEY(`Id_Joueurs`) REFERENCES `Joueurs`(`Id`);
ALTER TABLE
    `But` ADD CONSTRAINT `but_id_joueurs_foreign` FOREIGN KEY(`Id_Joueurs`) REFERENCES `Joueurs`(`Id`);
ALTER TABLE
	`But` ADD CONSTRAINT ` But_match_foreign`  FOREIGN KEY(`Match`) REFERENCES `Match`(`Id`);
ALTER TABLE
    `But` ADD CONSTRAINT `But_equipe_foreign` FOREIGN KEY(`Equipe`) REFERENCES `Equipe`(`Id`);
ALTER TABLE
    `Sortie` ADD CONSTRAINT `sortie_joueur_rentrant_foreign` FOREIGN KEY(`Joueur_rentrant`) REFERENCES `Joueurs`(`Id`);
ALTER TABLE
    `Sortie` ADD CONSTRAINT `sortie_joueur_sortant_foreign` FOREIGN KEY(`Joueur_sortant`) REFERENCES `Joueurs`(`Id`);
ALTER TABLE
    `Sortie` ADD CONSTRAINT `Sortie_Match_foreign` FOREIGN KEY(`Match`) REFERENCES `Match`(`Id`);
ALTER TABLE
    `Fautes` ADD CONSTRAINT ` Fautes_Equipe_foreign`  FOREIGN KEY(`Equipe`) REFERENCES `Equipe`(`Id`);
ALTER TABLE
    `Fautes` ADD CONSTRAINT ` Fautes_Id_Joueurs_foreign`  FOREIGN KEY(`Id_Joueurs`) REFERENCES `Joueurs`(`Id`);
ALTER TABLE
    `Fautes` ADD CONSTRAINT ` Fautes_Match_foreign`  FOREIGN KEY(`Match`) REFERENCES `Match`(`Id`);

