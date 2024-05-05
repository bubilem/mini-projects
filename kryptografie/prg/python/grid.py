class Grid:
    # kontruktor - načítá mřížku z csv souboru
    def __init__(self, file: str):
        with open("prg/python/" + file) as f:
            self.grid = [[int(num) for num in line.split(",")] for line in f]
        self.size = len(self.grid)

    # rotuje mřížku o 90° ve směru hodinových ručiček
    def rotate(self):
        self.grid = list(map(list, zip(*self.grid[::-1])))        

    # kontroluje, je-li mřížka validní
    def validate(self) -> bool:
        canvas = [([0] * self.size) for _ in range(self.size)]
        for state in range(4):
            for y in range(self.size):
                for x in range(self.size):
                    if self.grid[x][y] == 0:
                        if canvas[x][y] == 1:
                            return False
                        canvas[x][y] = 1                    
            self.rotate()
        return True

    def encrypt(self, text: str) -> str:
        # předpokládám optimální mřížku (max děr):
        multiplier = ((len(text)-1) // self.size**2) + 1
        canvas = [([" "] * self.size*multiplier) for _ in range(self.size)]
        text_index = 0
        grid_shift = 0
        end = False
        while not end:
            for state in range(4):
                for x in range(self.size):
                    for y in range(self.size):
                        if not end and self.grid[x][y] == 0:
                            canvas[x][y + grid_shift] = text[text_index]
                            text_index += 1
                            if text_index == len(text):
                                end = True                            
                self.rotate()                
            grid_shift += self.size            
        output = ""
        for x in range(len(canvas)):
            for y in range(len(canvas[0])):
                output += canvas[x][y]
            output += "\n"
        return output
        
    def print(self) -> str:
        output = "Grid:\n"
        for x in range(self.size):
            for y in range(self.size):
                output += str(self.grid[x][y])
            output += "\n"
        print(output)
