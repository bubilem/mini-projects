<?php
class Grid
{
    private array $grid;
    private int $size;

    public function __construct()
    {
        $this->grid = [];
        $this->size = 0;
    }

    public function load(string $file): static
    {
        $this->grid = json_decode(
            file_get_contents(__DIR__ . '/' . $file),
            true
        );
        $this->size = count($this->grid);
        return $this;
    }

    public function rotate(): static
    {
        $rotated_grid = [];
        // transform the grid
        for ($y = 0; $y < $this->size; $y++) {
            for ($x = 0; $x < $this->size; $x++) {
                $rotated_grid[$y][$x] = $this->grid[$x][$y];
            }
        }
        // reverse the items in rows
        foreach ($rotated_grid as &$row) {
            $row = array_reverse($row);
        }
        $this->grid = $rotated_grid;
        return $this;
    }

    public function validate(): bool
    {
        $canvas = [];
        foreach (range(0, 3) as $state) {
            for ($y = 0; $y < $this->size; $y++) {
                for ($x = 0; $x < $this->size; $x++) {
                    if ($this->grid[$x][$y] == 0) {
                        if (!isset($canvas[$x][$y])) {
                            $canvas[$x][$y] = 1;
                        } else {
                            return false;
                        }
                    }
                }
            }
            $this->rotate();
        }
        return true;
    }

    public function encrypt(string $text): string
    {
        $canvas = [];
        $char_index = 0;
        $grid_shift = 0;
        $end = false;
        while (!$end) {
            foreach (range(0, 3) as $state) {
                for ($y = 0; $y < $this->size; $y++) {
                    for ($x = $grid_shift; $x < $grid_shift + $this->size; $x++) {
                        if (!$end && $this->grid[$y][$x - $grid_shift] == 0) {
                            $canvas[$y][$x] = $text[$char_index++];
                            if ($char_index == strlen($text)) {
                                $end = true;
                            }
                        } else if (!isset($canvas[$y][$x])) {
                            $canvas[$y][$x] = " ";
                        }
                    }
                }
                $this->rotate();
            }
            $grid_shift += $this->size;
        }
        $output = '';
        foreach ($canvas as $row) {
            $output .= implode('', $row) . "\n";
        }
        return $output;
    }

    public function __toString(): string
    {
        $output = "Grid:\n";
        foreach ($this->grid as $row) {
            $output .= " " . implode("", $row) . "\n";
        }
        return $output;
    }
}