sqitch add 1.create_tables_v2 -n "création des tables"
sqitch add 2.add_constraint_delete -n "Ajout des contraintes ON DELETE CASCADE"
sqitch add 3.rework_transaction_table -n "Ajout d'une table budget lié a user, la table transaction lié a budget"
sqitch add 4.domain_index_check -n "Ajout d'index, de check, etc..."