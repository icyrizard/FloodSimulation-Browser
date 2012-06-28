# default:
# 	rm -f *.aux *.toc *.log *.out *.pdf
# 	pdflatex proposel.tex
# 	bibtex proposel.aux
# 	pdflatex proposel.tex
# 	pdflatex proposel.tex
proposel.tex: title.tex fsb.tex

%.pdf: %.tex
	pdflatex $^
	pdflatex $^

%.bbl: %.bib
	pdflatex $(^:.bib=.tex)
	bibtex8 $(@:.bbl=.aux)
	pdflatex $(^:.bib=.tex)
	pdflatex $(^:.bib=.tex)

clean:
	rm -f *.aux *.toc *.log *.out

realclean:
	rm -f *.aux *.toc *.log *.out *.pdf
