scriptie.tex: title.tex fsb.tex area_api.tex lsm-api.tex drfsm-api.tex references.bbl

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
