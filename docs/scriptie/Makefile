scriptie.tex: title.tex fsb.tex area_api.tex references.bbl

%.pdf: %.tex
	pdflatex $^
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
