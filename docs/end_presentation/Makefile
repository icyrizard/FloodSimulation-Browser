presentation.pdf: presentation.tex 

%.pdf: %.tex
	pdflatex $^

%.bbl: %.bib
	pdflatex scriptie.tex
	bibtex scriptie
	pdflatex scriptie.tex
	pdflatex scriptie.tex

clean:
	rm -f *.aux *.toc *.log *.out

realclean:
	rm -f *.aux *.toc *.log *.out *.pdf
