from grid import Grid

grid = Grid("grid4x4.csv")
grid.print()

print(f"Mřížka {"je" if grid.validate() else "není"} validní.")

print(grid.encrypt('Ahoj'))

print(grid.encrypt('ABCD1234EFGH5678IJKL'))